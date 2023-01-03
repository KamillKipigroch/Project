package CosplayCostumes.security.user.controller;

import CosplayCostumes.registration.RegistrationRequest;
import CosplayCostumes.registration.RegistrationService;
import CosplayCostumes.security.TokenProvider;
import CosplayCostumes.security.user.model.AuthResponse;
import CosplayCostumes.security.user.model.LoginUser;
import CosplayCostumes.security.user.model.User;
import CosplayCostumes.security.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@AllArgsConstructor
@RequestMapping("/auth")
public class LoginController {
    private final RegistrationService registrationService;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;


    @PostMapping("/login")
    public AuthResponse loginUser(@Valid @RequestBody LoginUser user) {
        String token = authenticateAndGetToken(user.getEmail(), user.getPassword());
        return new AuthResponse(token);
    }

    @PostMapping("/logout")
    public HttpStatus logoutUser(@RequestBody User user) {
        userService.logoutUser(user);
        return HttpStatus.OK;
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegistrationRequest request) {
        return new AuthResponse(registrationService.register(request));
    }

    public String authenticateAndGetToken(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        return tokenProvider.generate(authentication);
    }
}
