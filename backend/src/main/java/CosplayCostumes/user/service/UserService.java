package CosplayCostumes.user.service;

import CosplayCostumes.registration.token.ConfirmationToken;
import CosplayCostumes.registration.token.ConfirmationTokenService;
import CosplayCostumes.user.model.LoginUser;
import CosplayCostumes.user.model.User;
import CosplayCostumes.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.lang.module.FindException;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {
    private final static String USER_NOT_FOUND = "Failed to find user with username ";
    private final static String USER_ID_NOT_FOUND = "Failed to find user with id ";
    private final static String EMAIL_IS_TAKEN = "Email is already taken ";
    private final static String CANT_LOGIN = "Email or password its incorrect";
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

    public User findUserById (Long id) {
        return userRepository.findById(id).orElseThrow(() ->
                new FindException(USER_ID_NOT_FOUND + id));
    }
    public String signUpUser(User newUser) {
        boolean userExist =
                userRepository.findUserByEmail(newUser.getEmail()).isPresent();

        if (userExist) {
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

    public User loginUser(LoginUser loginUser) {
        if (loginUser == null || loginUser.getEmail().isEmpty()) {
            throw new FindException(USER_NOT_FOUND);
        }
        User user = userRepository.findUserByEmail(loginUser.getEmail())
                .orElseThrow(() -> new FindException(USER_NOT_FOUND + loginUser.getEmail()));

        if (bCryptPasswordEncoder.matches(loginUser.getPassword(),user.getPassword())) {
            user.setToken(UUID.randomUUID().toString());
            return userRepository.save(user);
        } else
            throw new IllegalStateException(CANT_LOGIN);
    }

    public void logoutUser(User user) {
        if (user == null) {
            throw new IllegalStateException(USER_NOT_FOUND);
        }
        User loginUser = userRepository.findUserByEmail(user.getEmail())
                .orElseThrow(() -> new IllegalArgumentException(USER_NOT_FOUND + user.getEmail()));

        if (Objects.equals(bCryptPasswordEncoder.encode(loginUser.getPassword()), bCryptPasswordEncoder.encode(user.getPassword()))) {
            loginUser.setToken(null);
            userRepository.save(loginUser);
        } else
            throw new IllegalStateException(CANT_LOGIN);
    }

    public int enableUser(String email) {
        return userRepository.enableUser(email);
    }

}
