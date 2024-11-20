package group7.se1876.kcs_backend.controller;

import group7.se1876.kcs_backend.dto.request.AddOrderDetail;
import group7.se1876.kcs_backend.dto.request.OrderDetailPaymentError;
import group7.se1876.kcs_backend.dto.request.ProductRequest;
import group7.se1876.kcs_backend.dto.request.RatingRequest;
import group7.se1876.kcs_backend.dto.response.OrderDetailResponse;
import group7.se1876.kcs_backend.dto.response.ProductResponse;
import group7.se1876.kcs_backend.dto.response.RatingResponse;
import group7.se1876.kcs_backend.exception.ApiResponse;
import group7.se1876.kcs_backend.exception.ProductAlreadyExistsException;
import group7.se1876.kcs_backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductService productService;


    @PostMapping("/create")
    public ResponseEntity<ProductResponse> createProduct(@ModelAttribute ProductRequest productRequest) {
        try {
            ProductResponse productResponse = productService.createProduct(productRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(productResponse);
        } catch (ProductAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ProductResponse("Product already exists"));
        }
    }


    @GetMapping("/all")
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        List<ProductResponse> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/products")
    public ResponseEntity<List<ProductResponse>> getAllProductsInShop() {
        List<ProductResponse> products = productService.getAllProductsInShop();
        return ResponseEntity.ok(products);
    }

    @PutMapping("/update/{productID}")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable int productID, @ModelAttribute ProductRequest productRequest) {
        Optional<ProductResponse> updatedProduct = productService.updateProduct(productID, productRequest);
        return updatedProduct.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{productID}")
    public ResponseEntity<String> deleteProduct(@PathVariable int productID) {
        productService.deleteProduct(productID);
        return ResponseEntity.ok("Product deleted successfully");
    }



    @PostMapping("/order")
    public ApiResponse<List<OrderDetailResponse>> orderProduct(@RequestBody AddOrderDetail request) {

        ApiResponse<List<OrderDetailResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(productService.orderProduct(request));

        return apiResponse;
    }

    @GetMapping("/search/{productID}")
    public ResponseEntity<ProductResponse> searchProduct(@PathVariable int productID) {
        Optional<ProductResponse> product = productService.searchProduct(productID);
        return product.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/deleteOrderPE")
    public ApiResponse<String> deleteOrderPe(@RequestBody OrderDetailPaymentError request){
        ApiResponse<String> apiResponse = new ApiResponse<>();
        apiResponse.setResult(productService.orderFailProduct(request));
        return apiResponse;
    }

    @PostMapping("/rating/{productId}")
    public ApiResponse<RatingResponse> postRating(@PathVariable("productId") int id,@ModelAttribute RatingRequest request){
        ApiResponse<RatingResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(productService.addRating(id,request));
        return apiResponse;
    }

    @GetMapping("/rating/getAll/{productId}")
    public ApiResponse<List<RatingResponse>> getAllRating(@PathVariable("productId") int id){
        ApiResponse<List<RatingResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(productService.getAllRating(id));
        return apiResponse;
    }

    @DeleteMapping("/rating/delete/{productId}/{userId}")
    public ApiResponse<String> deleteRating(@PathVariable("productId")int id,@PathVariable("userId")Long userId){
        ApiResponse<String> apiResponse = new ApiResponse<>();
        productService.deleteRating(id,userId);
        apiResponse.setResult("Delete success!");
        return apiResponse;
    }
}
