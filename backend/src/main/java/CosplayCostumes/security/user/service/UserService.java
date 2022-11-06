package CosplayCostumes.security.user.service;

import CosplayCostumes.registration.token.ConfirmationToken;
import CosplayCostumes.registration.token.ConfirmationTokenService;
import CosplayCostumes.security.user.model.LoginUser;
import CosplayCostumes.security.user.model.User;
import CosplayCostumes.security.user.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.lang.module.FindException;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

import static CosplayCostumes.security.TokenProvider.*;

@Service
public class UserService implements UserDetailsService {
    private final static String USER_NOT_FOUND = "Failed to find user with email ";
    private final static String USER_ID_NOT_FOUND = "Failed to find user with id ";
    private final static String EMAIL_IS_TAKEN = "Email is already taken ";
    private final static String CANT_LOGIN = "Email or password its incorrect";
    private final UserRepository userRepository;
    private final ConfirmationTokenService confirmationTokenService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration.minutes}")
    private Long jwtExpirationMinutes;

    @Autowired
    public UserService(UserRepository repository, ConfirmationTokenService confirmationTokenService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = repository;
        this.confirmationTokenService = confirmationTokenService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findUserByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(USER_NOT_FOUND + email));
    }

    public User findUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() ->
                new FindException(USER_ID_NOT_FOUND + id));
    }

    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email).orElseThrow(() ->
                new FindException(USER_NOT_FOUND + email));
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

        String token = generate(newUser);
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                newUser
        );
        return token;
    }

    public User loginUser(LoginUser loginUser) {
        if (loginUser == null || loginUser.getEmail().isEmpty()) {
            throw new FindException(USER_NOT_FOUND);
        }
        User user = userRepository.findUserByEmail(loginUser.getEmail())
                .orElseThrow(() -> new FindException(USER_NOT_FOUND + loginUser.getEmail()));

        if (bCryptPasswordEncoder.matches(loginUser.getPassword(), user.getPassword())) {

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

        if (!Objects.equals(bCryptPasswordEncoder.encode(loginUser.getPassword()), bCryptPasswordEncoder.encode(user.getPassword()))) {
            throw new IllegalStateException(CANT_LOGIN);
        }
    }

    public int enableUser(String email) {
        return userRepository.enableUser(email);
    }


    public String generate(User user) {
        List<String> roles = user.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        byte[] signingKey = jwtSecret.getBytes();

        return Jwts.builder()
                .setHeaderParam("typ", TOKEN_TYPE)
                .signWith(Keys.hmacShaKeyFor(signingKey), SignatureAlgorithm.HS512)
                .setExpiration(Date.from(ZonedDateTime.now().plusMinutes(jwtExpirationMinutes).toInstant()))
                .setIssuedAt(Date.from(ZonedDateTime.now().toInstant()))
                .setId(UUID.randomUUID().toString())
                .setIssuer(TOKEN_ISSUER)
                .setAudience(TOKEN_AUDIENCE)
                .setSubject(user.getUsername())
                .claim("rol", roles)
                .claim("name", user.getFirstName()+" "+user.getLastName())
                .claim("preferred_username", user.getUsername())
                .claim("email", user.getEmail())
                .compact();
    }
}
