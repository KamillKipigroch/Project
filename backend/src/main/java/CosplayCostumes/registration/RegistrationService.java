package CosplayCostumes.registration;


import CosplayCostumes.registration.token.ConfirmationToken;
import CosplayCostumes.registration.token.ConfirmationTokenService;
import CosplayCostumes.rest.model.dto.RegisterUserRequest;
import CosplayCostumes.security.user.model.LoginUser;
import CosplayCostumes.security.user.model.User;
import CosplayCostumes.security.user.model.UserRole;
import CosplayCostumes.security.user.service.UserService;
import lombok.AllArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@AllArgsConstructor
public class RegistrationService {
    private static final int GENERATED_PASSWORD_LENGTH = 7;
    private final org.slf4j.Logger logger = LoggerFactory.getLogger(this.getClass());
    private final static String EMAIL_NOT_VALID = "Email not valid !";
    private EmailValidator emailValidator;
    private final ConfirmationTokenService confirmationTokenService;

    private UserService userService;


    public String register(RegistrationRequest request) {
        boolean isValidEmail = emailValidator.test(request.getEmail());
        if (!isValidEmail)
            throw new IllegalStateException(EMAIL_NOT_VALID);

        String token =  userService.signUpUser(
                new User(
                        request.getFirstName(),
                        request.getLastName(),
                        request.getEmail(),
                        request.getPassword(),
                        UserRole.User
                        )
                );

       return token;
    }

    @Transactional
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        confirmationTokenService.setConfirmedAt(token);
        userService.enableUser(
                confirmationToken.getUser().getEmail());
        return "confirmed";
    }

    public User registerUser(RegisterUserRequest request) {
        boolean isValidEmail = emailValidator.test(request.getEmail());
        if (!isValidEmail)
            throw new IllegalStateException(EMAIL_NOT_VALID);
        String password = "Password";

        UserRole role =  UserRole.User;
        userService.signUpUser(
                new User(
                        request.getFirstName(),
                        request.getLastName(),
                        request.getEmail(),
                        password,
                        role));

        return userService.loginUser(new LoginUser(request.getEmail(),password));
    }
    private String renderPassword() {
        UUID randomUUID = UUID.randomUUID();

        var password = randomUUID.toString().replaceAll("_", "");

        return password.substring(0, GENERATED_PASSWORD_LENGTH);
    }
}
