package group7.se1876.kcs_backend.service;

import group7.se1876.kcs_backend.dto.request.AddFishDevelopmentHistoryRequest;
import group7.se1876.kcs_backend.dto.request.AddFishRequest;
import group7.se1876.kcs_backend.dto.request.FishUpdateRequest;
import group7.se1876.kcs_backend.dto.response.FishResponse;
//import group7.se1876.kcs_backend.dto.response.FoodCalculationResponse;
import group7.se1876.kcs_backend.dto.response.KoiFishDevelopmentResponse;
import group7.se1876.kcs_backend.entity.*;
import group7.se1876.kcs_backend.exception.AppException;
import group7.se1876.kcs_backend.exception.ErrorCode;
import group7.se1876.kcs_backend.mapper.FishMapper;
import group7.se1876.kcs_backend.repository.FishHistoriesRepository;
import group7.se1876.kcs_backend.repository.FishRepository;
//import group7.se1876.kcs_backend.repository.FoodCalculationRepository;
import group7.se1876.kcs_backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class FishService {

    private FishRepository fishRepository;
    private FishMapper fishMapper;
    private UserRepository userRepository;
    private FishHistoriesRepository fishHistories;
//    private FoodCalculationRepository foodCalculationRepository;
    private FirebaseStorageService firebaseStorageService;


    //Add fish
    public FishResponse addFish(AddFishRequest request){

        Long userId = Long.valueOf(SecurityContextHolder.getContext().getAuthentication().getName());
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new AppException(ErrorCode.INVALID_USERID));

        Fish fish = fishMapper.mapToFish(request);

        // Upload image to Firebase
        if (request.getFishImg() != null && !request.getFishImg().isEmpty()) {
            try {
                String imageUrl = firebaseStorageService.uploadFile(request.getFishImg(),"fishImg/");  // Corrected
                fish.setFishImg(imageUrl);  // Assuming Pond entity has pondImg field
            } catch (IOException e) {
                throw new AppException(ErrorCode.FAIL_UPLOADFILE);
            }
        }

        fish.setOwner(user);
        fishRepository.save(fish);

        user.getFishOwned().add(fish);
        userRepository.save(user);

        return fishMapper.mapToFishResponse(fish) ;
    }

    //Get all fish
    public List<FishResponse> getAllFish(){

        Long userId = Long.valueOf(SecurityContextHolder.getContext().getAuthentication().getName());
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new AppException(ErrorCode.INVALID_USERID));

        Set<Fish> ownerFish = user.getFishOwned();

        return ownerFish.stream().map((fish)-> fishMapper.mapToFishResponse(fish)).collect(Collectors.toList());
    }

    public FishResponse getFishInfo(Long fishId){

        Fish fish = fishRepository.findById(fishId)
                .orElseThrow(()->new AppException(ErrorCode.DATA_NOT_EXISTED));
        Long userId = Long.valueOf(SecurityContextHolder.getContext().getAuthentication().getName());

        if (userId!=fish.getOwner().getUserId())
            throw new AppException(ErrorCode.INVALID_USERID);

        return fishMapper.mapToFishResponse(fish);
    }

    //Update fish
    public FishResponse updateFish(Long fishId, FishUpdateRequest request){

        Fish fish = fishRepository.findById(fishId)
                .orElseThrow(()->new AppException(ErrorCode.DATA_NOT_EXISTED));

        Long userId = Long.valueOf(SecurityContextHolder.getContext().getAuthentication().getName());
        if (userId!=fish.getOwner().getUserId())
            throw new AppException(ErrorCode.INVALID_DATA_WITH_USERID);

        fish.setFishName(request.getFishName());
        // Upload image to Firebase
        if (request.getFishImg() != null && !request.getFishImg().isEmpty()) {
            try {
//                firebaseStorageService.deleteFile(fish.getFishImg());
                String imageUrl = firebaseStorageService.uploadFile(request.getFishImg(),"fishImg/");  // Corrected
                fish.setFishImg(imageUrl);  // Assuming Pond entity has pondImg field
            } catch (IOException e) {
                throw new AppException(ErrorCode.FAIL_UPLOADFILE);
            }
        }
        fish.setFishSize(request.getFishSize());
        fish.setFishShape(request.getFishShape());
        fish.setFishAge(request.getFishAge());
        fish.setFishWeight(request.getFishWeight());
        fish.setFishGender(request.getFishGender());
        fish.setFishGender(request.getFishGender());
        fish.setFishHealth(request.getFishHealth());
        fish.setFishType(request.getFishType());
        fish.setOrigin(request.getOrigin());
        fish.setPrice(request.getPrice());

        fishRepository.save(fish);

        return fishMapper.mapToFishResponse(fish);
    }

    //Delete fish
    public void deleteFish(Long fishId){

        Fish fish = fishRepository.findById(fishId)
                .orElseThrow(()-> new AppException(ErrorCode.DATA_NOT_EXISTED));

        User user = fish.getOwner();
        Long userId = Long.valueOf(SecurityContextHolder.getContext().getAuthentication().getName());


        if (userId!=fish.getOwner().getUserId())
            throw new AppException(ErrorCode.INVALID_DATA_WITH_USERID);

        for (Pond pond : fish.getPonds()) {
            pond.getFish().remove(fish);  // Remove fish from the pond
        }

        if (user != null) {
            // Remove the fish from the user's list
            user.getFishOwned().remove(fish);
            // Save the updated user object
            userRepository.save(user);
        }


        fishRepository.delete(fish);

    }

    //Add fish history
    public KoiFishDevelopmentResponse addFishHistory(Long fishId, AddFishDevelopmentHistoryRequest request){

        Fish fish = fishRepository.findById(fishId)
                .orElseThrow(()->new AppException(ErrorCode.DATA_NOT_EXISTED));

        Long userId = Long.valueOf(SecurityContextHolder.getContext().getAuthentication().getName());

        if (!fish.getOwner().getUserId().equals(userId)){
            throw new AppException(ErrorCode.INVALID_DATA_WITH_USERID);
        }

        FishDevelopmentHistory fishDevelopmentHistory = fishMapper.mapToFishHistory(request) ;
        fishDevelopmentHistory.setFish(fish);

        fish.getFishDevelopmentHistories().add(fishDevelopmentHistory);
        fishRepository.save(fish);

        return fishMapper.mapToKoiFishResponse(fishDevelopmentHistory);

    }

    //Get all fish history
    public List<KoiFishDevelopmentResponse> getFishHistories(Long fishId){

        Fish fish = fishRepository.findById(fishId)
                .orElseThrow(()-> new AppException(ErrorCode.DATA_NOT_EXISTED));

        Long userId = Long.valueOf(SecurityContextHolder.getContext().getAuthentication().getName());

        if (!fish.getOwner().getUserId().equals(userId)){
            throw new AppException(ErrorCode.INVALID_DATA_WITH_USERID);
        }

        List<FishDevelopmentHistory> fishDevelopmentHistories = fish.getFishDevelopmentHistories();

        return fishDevelopmentHistories.stream()
                .map((fishDevelopmentHistory)-> fishMapper.mapToKoiFishResponse(fishDevelopmentHistory))
                .collect(Collectors.toList());
    }

    //Add Food Calculation
//    public FoodCalculationResponse addFoodCalculation(Long fishId){
//
//        Fish fish = fishRepository.findById(fishId)
//                .orElseThrow(()-> new AppException(ErrorCode.DATA_NOT_EXISTED));
//
//        Long userId = Long.valueOf(SecurityContextHolder.getContext().getAuthentication().getName());
//
//        if (!fish.getOwner().getUserId().equals(userId)){
//            throw new AppException(ErrorCode.INVALID_DATA_WITH_USERID);
//        }
//
//        FoodCalculation foodCalculation = new FoodCalculation();
//
//        int fishAge = fish.getFishAge();
//        double foodPercentage;
//
//        if (fishAge <= 1) {
//            // Young Fish
//            foodPercentage = 0.05; // 5% of weight
//        } else if (fishAge <= 3) {
//            // Juvenile Fish
//            foodPercentage = 0.03; // 3% of weight
//        } else {
//            // Adult Fish
//            foodPercentage = 0.015; // 1.5% of weight
//        }
//
//        double foodAmount = fish.getFishWeight() * foodPercentage;
//
//        foodCalculation.setFoodAmount(foodAmount);
//        foodCalculation.setFish(fish);
//        foodCalculation.setFeed(new Date());
//        foodCalculationRepository.save(foodCalculation);
//
//        fish.getFoodCalculations().add(foodCalculation);
//        fishRepository.save(fish);
//
//        return fishMapper.mapToFoodCalculationResponse(foodCalculation);
//    }
//
//    //Get all food calculation of fish
//    public List<FoodCalculationResponse> getAllFoodCalculation(Long fishId){
//
//        Fish fish = fishRepository.findById(fishId)
//                .orElseThrow(()-> new AppException(ErrorCode.DATA_NOT_EXISTED));
//
//        Long userId = Long.valueOf(SecurityContextHolder.getContext().getAuthentication().getName());
//
//        if (!fish.getOwner().getUserId().equals(userId)){
//            throw new AppException(ErrorCode.INVALID_DATA_WITH_USERID);
//        }
//
//        List<FoodCalculation> foodCalculations = fish.getFoodCalculations();
//
//        return foodCalculations.stream().map((food)-> fishMapper.mapToFoodCalculationResponse(food)).collect(Collectors.toList());
//    }

}
