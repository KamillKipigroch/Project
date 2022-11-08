package CosplayCostumes.rest.controller;

import CosplayCostumes.rest.model.Opinion;
import CosplayCostumes.rest.model.OpinionImage;
import CosplayCostumes.rest.model.Product;
import CosplayCostumes.rest.model.dto.OpinionDTO;
import CosplayCostumes.rest.service.OpinionService;
import CosplayCostumes.rest.service.ProductService;
import CosplayCostumes.security.user.model.User;
import CosplayCostumes.security.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static CosplayCostumes.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@RestController
@AllArgsConstructor
@RequestMapping("/api/opinion")
public class OpinionController {
    private final OpinionService opinionService;
    private final OpinionImageController opinionImageController;
    private final UserService userService;
    private final ProductService productService;

    @GetMapping("/get-all")
    public ResponseEntity<List<Opinion>> getAll() {
        List<Opinion> opinions = opinionService.findAllOpinion();
        return new ResponseEntity<>(opinions, HttpStatus.OK);
    }

    @PostMapping("/add-object")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<Opinion> addOpinion(@RequestBody OpinionDTO opinionDTO) {
        User user = userService.findUserById(opinionDTO.getUserID());
        Product product = productService.findProductById(opinionDTO.getProductID());

        Opinion opinion = opinionService.addOpinion(opinionDTO, user, product);

        opinionDTO.getOpinionImages().forEach(image -> {
            image.setOpinionId(opinion.getId());
            opinionImageController.addOpinionImage(image);
        });
        return new ResponseEntity<>(opinion, HttpStatus.OK);
    }

    @PutMapping("/update-object")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<Opinion> updateOpinion(@RequestBody Opinion opinion) {
        Opinion newQuality = opinionService.updateOpinion(opinion);
        return new ResponseEntity<>(newQuality, HttpStatus.OK);
    }

    @PutMapping("/delete-object")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<Opinion> deleteCondition(@RequestBody Opinion opinion) {
        opinionService.deleteOpinion(opinion);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
