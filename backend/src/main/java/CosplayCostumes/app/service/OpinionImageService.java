package CosplayCostumes.app.service;

import CosplayCostumes.app.model.OpinionImage;
import CosplayCostumes.app.repostitory.OpinionImageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.module.FindException;
import java.util.List;

@Service
@AllArgsConstructor
public class OpinionImageService {
    private final static String OPINION_IMAGE_NO_FOUND = "Failed to find opinion image ";
    private final static String OPINION_IMAGE_EXIST = "Opinion image with this name with this name is exist ";

    private final OpinionImageRepository opinionImageRepository;

    public List<OpinionImage> findAllOpinionImage() {
        return opinionImageRepository.findAll();
    }

    public OpinionImage findOpinionImageByCode(String code) throws Exception {
        return opinionImageRepository.findByCode(code).orElseThrow(() -> new Exception(OPINION_IMAGE_NO_FOUND + code));
    }

    public OpinionImage addOpinionImage(OpinionImage opinionImage) {
        if (opinionImageRepository.findByCode(opinionImage.getCode()).isPresent())
            throw new FindException(OPINION_IMAGE_EXIST + opinionImage.getCode());
        else {
            opinionImage = opinionImageRepository.save(opinionImage);
        }
        return opinionImage;
    }

    public OpinionImage updateOpinionImage(OpinionImage opinionImage) {
        return opinionImageRepository.save(opinionImage);
    }

    public void deleteOpinionImage(OpinionImage opinionImage) {
        opinionImage.setVisible(false);
        opinionImageRepository.save(opinionImage);
    }
}
