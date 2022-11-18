package CosplayCostumes.rest.controller;

import CosplayCostumes.rest.service.LoginUserService;
import CosplayCostumes.rest.service.OrderStatusService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/login-user/")
public class LoginUserController {
    private final LoginUserService loginUserService;
    private final OrderStatusService orderStatusService;


}
