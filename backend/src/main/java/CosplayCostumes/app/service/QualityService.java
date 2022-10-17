package CosplayCostumes.app.service;

import CosplayCostumes.app.model.Quality;
import CosplayCostumes.app.model.dto.QualityDTO;
import CosplayCostumes.app.repostitory.QualityRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.module.FindException;
import java.util.List;

@Service
@AllArgsConstructor
public class QualityService {
    private final static String QUALITY_NO_FOUND = "Failed to find quality with name";
    private final static String QUALITY_EXIST = "Quality with this name is already exist ! ";
    private final QualityRepository qualityRepository;

    public List<Quality> findAllQuality() {
        return qualityRepository.findAll();
    }

    public Quality findQualityByCode(String code) {
        return qualityRepository.findByCode(code).orElseThrow(() -> new FindException(QUALITY_NO_FOUND + code));
    }

    public Quality addQuality(QualityDTO quality) {
        if (qualityRepository.findByCode(quality.getCode()).isPresent()) {
            throw new FindException(QUALITY_EXIST);
        }

        Quality newQuality = new Quality();
        newQuality.setCode(quality.getCode());
        newQuality.setVisible(true);

        return qualityRepository.save(newQuality);
    }

    public Quality updateQuality(Quality quality) {
        return qualityRepository.save(quality);
    }

    public void deleteQuality(Quality quality) {
        quality.setVisible(false);
        qualityRepository.save(quality);
    }
}
