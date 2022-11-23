package CosplayCostumes.rest.service;

import CosplayCostumes.security.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LoginUserService {
    private final UserRepository userRepository;



}
