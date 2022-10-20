package CosplayCostumes.app.controller;

import CosplayCostumes.app.model.Opinion;
import CosplayCostumes.app.model.OpinionImage;
import CosplayCostumes.app.model.Product;
import CosplayCostumes.app.model.dto.OpinionDTO;
import CosplayCostumes.app.service.OpinionImageService;
import CosplayCostumes.app.service.OpinionService;
import CosplayCostumes.app.service.ProductService;
import CosplayCostumes.user.model.User;
import CosplayCostumes.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@AllArgsConstructor
@RequestMapping("/opinion")
public class OpinionController {
    private final OpinionService opinionService;
    private final OpinionImageService opinionImageService;
    private final UserService userService;
    private final ProductService productService;

    @GetMapping("/get-all")
    public ResponseEntity<List<Opinion>> getAll() {
        List<Opinion> opinions = opinionService.findAllOpinion();
        return new ResponseEntity<>(opinions, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Opinion> addOpinion(@RequestBody OpinionDTO opinionDTO) throws Exception {
        User user = userService.findUserById(opinionDTO.getUserID());
        Product product = productService.findProductById(opinionDTO.getProductID());

        List<OpinionImage> images = new ArrayList<>();
        Opinion opinion = opinionService.addOpinion(opinionDTO, (Set<OpinionImage>) images, user, product);
        opinionDTO.getOpinionImages().forEach(image -> opinionImageService.addOpinionImage(image, opinion));

        Opinion newOpinion = opinionService.findOpinionById(opinion.getId());
        return new ResponseEntity<>(newOpinion, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Opinion> updateOpinion(@RequestBody Opinion opinion) {
        Opinion newQuality = opinionService.updateOpinion(opinion);
        return new ResponseEntity<>(newQuality, HttpStatus.OK);
    }

    @PutMapping("/delete")
    public ResponseEntity<Opinion> deleteCondition(@RequestBody Opinion opinion) {
        opinionService.deleteOpinion(opinion);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
