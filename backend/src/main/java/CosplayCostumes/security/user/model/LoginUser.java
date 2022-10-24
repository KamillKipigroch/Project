package CosplayCostumes.security.user.model;

import lombok.Data;

@Data
public class LoginUser {
    String email;
    String password;
}