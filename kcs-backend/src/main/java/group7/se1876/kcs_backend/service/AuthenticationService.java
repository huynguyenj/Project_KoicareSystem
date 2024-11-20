package group7.se1876.kcs_backend.service;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import group7.se1876.kcs_backend.dto.request.*;
import group7.se1876.kcs_backend.dto.response.AuthenticationResponse;
import group7.se1876.kcs_backend.dto.response.TokenResponse;
import group7.se1876.kcs_backend.dto.response.TrackingUserResponse;
import group7.se1876.kcs_backend.dto.response.VerifyTokenResponse;
import group7.se1876.kcs_backend.entity.InvalidatedToken;
import group7.se1876.kcs_backend.entity.TrackingUserLogin;
import group7.se1876.kcs_backend.entity.User;
import group7.se1876.kcs_backend.exception.AppException;
import group7.se1876.kcs_backend.exception.ErrorCode;
import group7.se1876.kcs_backend.repository.InvalidatedTokenRepository;
import group7.se1876.kcs_backend.repository.TrackingUserRepository;
import group7.se1876.kcs_backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor // Only injects final fields

public class AuthenticationService {

    private final UserRepository userRepository;
    private final InvalidatedTokenRepository invalidatedTokenRepository;
    private final TrackingUserRepository trackingUserRepository;

    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNAL_KEY;

    // Authentication when login
    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest){

        var user = userRepository.findByUserName(authenticationRequest.getUserName())
                .orElseThrow(() -> {
                    return new AppException(ErrorCode.USER_NOT_EXISTED);
                });

        boolean status = user.isStatus();

        //Check password is match to password in database by BCrypt algorithm password
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        //Compare password from request and from database
        boolean authendicated = passwordEncoder.matches(authenticationRequest.getPassword(), user.getPassword());

        if (!authendicated || !status)
            throw new AppException(ErrorCode.UNAUTHENDICATED);

        //Create token for user
        TokenResponse token = generateToken(user);
        AuthenticationResponse authRes = new AuthenticationResponse();

        authRes.setToken(token.getToken());
        authRes.setAuthenticated(true);

        trackingLogin(user.getUserId(),token.getExpirationTime());

        return authRes;

    }

    //Create token
    private TokenResponse generateToken(User user){

        //Create header
        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS512);

        //Create payload
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(String.valueOf(user.getUserId()))
                .issuer("koicare.com")
                .issueTime(new Date())
                .expirationTime(new Date(
                        //Set time for token
                        Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli() // expired in 1 hour
                ))
                .jwtID(UUID.randomUUID().toString()) // token ID
                .claim("scope",buildScope(user)) // info of token claim
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        //JWTObject: need 2 param: header and payload
        JWSObject jwsObject = new JWSObject(jwsHeader,payload);

        //Sign token ( ensure that it cannot be modified and to prove that it was issued by a trusted party.)
        try {
            jwsObject.sign(new MACSigner(SIGNAL_KEY.getBytes()));
            return new TokenResponse(jwsObject.serialize(), jwtClaimsSet.getExpirationTime());
        } catch (JOSEException e) {
            log.error("Cannot create token",e);
            throw new RuntimeException(e);
        }


    }

    //Verify token of user already login
    public VerifyTokenResponse verifyToken(VerifyTokenRequest verifyTokenRequest) throws ParseException, JOSEException {

        var token = verifyTokenRequest.getToken();
        VerifyTokenResponse verifyTokenResponse = new VerifyTokenResponse();

        boolean isValid = true;

        try {
                tokenCheck(token);
        }catch (AppException e){
                isValid = false;
        }
            verifyTokenResponse.setValid(isValid);

        return verifyTokenResponse;

    }

    //Build scope for token
    private String buildScope(User user){
        // StringJoiner make a discrete infomation (can be arrays, list, object) to a string
        StringJoiner stringJoiner = new StringJoiner(" ");

        if (!CollectionUtils.isEmpty(user.getRoles())){
               //Role define to be a set so we make it in to a string and separate by " "
                user.getRoles().forEach(roles -> {stringJoiner.add(roles.getRoleType());});

            }
            return stringJoiner.toString();
    }

    //Logout
    public void logout(LogoutRequest request) throws ParseException, JOSEException {

    try {

        String token = request.getToken(); // Assuming token is available here
        SignedJWT signedJWT = SignedJWT.parse(token);
        String userId = signedJWT.getJWTClaimsSet().getSubject();

        if (userId!=null){
            Long userIdBefore = Long.valueOf(userId);
            System.out.println(userId);
            trackingUserRepository.deleteByUserId(userIdBefore);
        }
        }catch (Exception e){
    throw new AppException(ErrorCode.INVALID_INFOMATION);
    }

        var signToken = tokenCheck(request.getToken());

        String jit = signToken.getJWTClaimsSet().getJWTID();
        Date expiredTime = signToken.getJWTClaimsSet().getExpirationTime();

        InvalidatedToken invalidToken = new InvalidatedToken();
        invalidToken.setTokenId(jit);
        invalidToken.setTimeExpired(expiredTime);


        invalidatedTokenRepository.save(invalidToken);


    }

    //Check token information
    private SignedJWT tokenCheck(String token) throws JOSEException, ParseException {

        JWSVerifier verifier = new MACVerifier(SIGNAL_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expityTime = signedJWT.getJWTClaimsSet().getExpirationTime(); // Check date expired of token
        var verified = signedJWT.verify(verifier); // check token sign from request equal to token signKey we create in application.properties

        //Check token date and data of token
        if (!(verified && expityTime.after(new Date())))
            throw new AppException(ErrorCode.UNAUTHENDICATED);

        if (invalidatedTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID()))
            throw new AppException(ErrorCode.UNAUTHORIZED);

        return signedJWT;
    }

    //Tracking login
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    private void trackingLogin(Long userId, Date expiredTime){

        TrackingUserLogin trackingUserLogin = new TrackingUserLogin();
        trackingUserLogin.setUserId(userId);
        trackingUserLogin.setLoginTime(new Date());
        trackingUserLogin.setExpiredTime(expiredTime);
        trackingUserRepository.save(trackingUserLogin);
    }

    //Count login user at present
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public TrackingUserResponse countLoginUser(){

        Set<Long> uniqueUserIds = new HashSet<>();
        List<TrackingUserLogin> userLogins = trackingUserRepository.findAll();


        for (TrackingUserLogin user : userLogins){
            uniqueUserIds.add(user.getUserId());
        }

        Long count = (long)uniqueUserIds.size();

        TrackingUserResponse trackingUserResponse = new TrackingUserResponse();
        trackingUserResponse.setUserCount(count);

         return trackingUserResponse;
    }

    public String checkPassword(CheckPasswordRequest request){

        Long userId = Long.valueOf(SecurityContextHolder.getContext().getAuthentication().getName());
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new AppException((ErrorCode.INVALID_USERID)));
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        boolean checking = passwordEncoder.matches(request.getOldPassword(), user.getPassword());

        if (checking){
            return "correct";
        }
        return "wrong";
    }

    public String changePassoword(ChangePasswordRequest request){

        Long userId = Long.valueOf(SecurityContextHolder.getContext().getAuthentication().getName());
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new AppException((ErrorCode.INVALID_USERID)));
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        return "Cập nhật thành công";
    }

}
