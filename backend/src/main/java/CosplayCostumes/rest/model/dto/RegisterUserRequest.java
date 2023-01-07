package CosplayCostumes.rest.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegisterUserRequest {
    private String firstName;
    private String lastName;
    private String email;
}
