package group7.se1876.kcs_backend.controller;

import com.nimbusds.jose.JOSEException;
import group7.se1876.kcs_backend.dto.request.*;
import group7.se1876.kcs_backend.dto.response.AuthenticationResponse;
import group7.se1876.kcs_backend.dto.response.TrackingUserResponse;
import group7.se1876.kcs_backend.dto.response.VerifyTokenResponse;
import group7.se1876.kcs_backend.exception.ApiResponse;
import group7.se1876.kcs_backend.service.AuthenticationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;


@AllArgsConstructor
@RestController
@RequestMapping("/auth")

public class AuthenticationController {
    private AuthenticationService authenticationService;

    //Login authentication
    @PostMapping("/login")
    ApiResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){

        var result = authenticationService.authenticate(request);
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();

        authenticationResponse.setAuthenticated(result.isAuthenticated());
        authenticationResponse.setToken(result.getToken());

        ApiResponse<AuthenticationResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(authenticationResponse);

        return apiResponse;
    }

    //Verify token
    @PostMapping("/verifyToken")
    ApiResponse<VerifyTokenResponse> authenticate(@RequestBody VerifyTokenRequest request) throws ParseException, JOSEException {

        var result = authenticationService.verifyToken(request);
        VerifyTokenResponse verifyTokenResponse = new VerifyTokenResponse();

        verifyTokenResponse.setValid(result.isValid());

        ApiResponse<VerifyTokenResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(verifyTokenResponse);

        return apiResponse;
    }

    @PostMapping("/logout")
    ApiResponse<String> logoutUser(@RequestBody LogoutRequest request) throws ParseException, JOSEException {

        authenticationService.logout(request);

        return new ApiResponse<>();
    }

    //Count login user
    @GetMapping("/trackingLogin")
    public ApiResponse<TrackingUserResponse> countLogin(){

        ApiResponse<TrackingUserResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(authenticationService.countLoginUser());

        return apiResponse;
    }

    //Check password
    @PostMapping("/user/checkPass")
    public ApiResponse<String> checkPass(@RequestBody CheckPasswordRequest request){

        ApiResponse<String> apiResponse = new ApiResponse<>();
        apiResponse.setResult(authenticationService.checkPassword(request));
        return  apiResponse;
    }

    //Change password
    @PatchMapping("/user/ChangePassword")
    public ApiResponse<String> changePassword(@RequestBody ChangePasswordRequest request){
        ApiResponse<String> apiResponse = new ApiResponse<>();
        apiResponse.setResult(authenticationService.changePassoword(request));
        return apiResponse;
    }
}
