package CosplayCostumes.user.controller;

import CosplayCostumes.user.model.User;
import CosplayCostumes.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping
public class LoginController {
    private final UserService userService;

    @PutMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User user) {
        User loginUser = userService.loginUser(user);
        return new ResponseEntity<>(loginUser, HttpStatus.OK);
    }

    @PutMapping("/logout")
    public HttpStatus logoutUser(@RequestBody User user) {
        userService.logoutUser(user);
        return HttpStatus.OK;
    }
}
