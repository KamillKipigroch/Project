package CosplayCostumes.user.controller;

import CosplayCostumes.user.model.LoginUser;
import CosplayCostumes.user.model.User;
import CosplayCostumes.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class LoginController {
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody LoginUser user) {
        User loginUser = userService.loginUser(user);
        return new ResponseEntity<>(loginUser, HttpStatus.OK);
    }

    @PostMapping("/logout")
    public HttpStatus logoutUser(@RequestBody User user) {
        userService.logoutUser(user);
        return HttpStatus.OK;
    }
}
