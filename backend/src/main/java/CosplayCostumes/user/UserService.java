package CosplayCostumes.user;

import CosplayCostumes.registration.token.ConfirmationToken;
import CosplayCostumes.registration.token.ConfirmationTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {
    private final static String USER_NOT_FOUND = "Failed to find user with username ";
    private final static String EMAIL_IS_TAKEN = "Email is already taken ";
    private final UserRepository userRepository;
    private final ConfirmationTokenService confirmationTokenService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserService(UserRepository repository, ConfirmationTokenService confirmationTokenService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = repository;
        this.confirmationTokenService = confirmationTokenService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findUserByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException(USER_NOT_FOUND + username));
    }

    public String signUpUser(User newUser) {
        boolean userExist =
                userRepository.findUserByEmail(newUser.getEmail()).isPresent();

        if(userExist) {
            throw new IllegalStateException(EMAIL_IS_TAKEN);
        }

        String encodedPassword = bCryptPasswordEncoder
                .encode(newUser.getPassword());

        newUser.setPassword(encodedPassword);

        userRepository.save(newUser);

        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                newUser
        );

        confirmationTokenService.saveConfirmationToken(
                confirmationToken
        );
        return token;
    }
    public int enableUser(String email) {
        return userRepository.enableUser(email);
    }

}
