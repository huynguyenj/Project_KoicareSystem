package group7.se1876.kcs_backend.dto.request;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UpdateShopRequest {
    private Long shopId;
    private String shopName;
    private String address;
    private String phone;
    private String email;
    private String contactInfo;
    private boolean status;
}
