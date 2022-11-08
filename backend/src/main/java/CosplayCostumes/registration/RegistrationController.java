package CosplayCostumes.registration;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
    @RequestMapping(path = "api/v1/registration")
@AllArgsConstructor
public class RegistrationController {



   /* @GetMapping(path = "confirm")
    public String confirm(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }*/
}
