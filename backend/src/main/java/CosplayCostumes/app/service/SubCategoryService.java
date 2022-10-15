
package CosplayCostumes.app.service;

import CosplayCostumes.app.model.Subcategory;
import CosplayCostumes.app.repostitory.SubCategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.module.FindException;
import java.util.List;

@Service
@AllArgsConstructor
public class SubCategoryService {
    private final static String SUB_CATEGORY_NO_FOUND = "Failed to find category with name ";

    private final static String SUB_CATEGORY_EXIST = "Sub Category with this name is already exist ! ";

    private final SubCategoryRepository subCategoryRepository;

    public List<Subcategory> findAllSubCategory() {
        return subCategoryRepository.findAll();
    }

    public Subcategory findSubCategoryByCode(String code) throws Exception {
        return subCategoryRepository.findByCode(code).orElseThrow(() -> new Exception(SUB_CATEGORY_NO_FOUND + code));
    }

    public Subcategory addSubCategory(Subcategory subcategory) {
        if (subCategoryRepository.findByCode(subcategory.getCode()).isPresent())
            throw new FindException(SUB_CATEGORY_EXIST + subcategory.getCode());
        return subCategoryRepository.save(subcategory);
    }

    public Subcategory updateSubCategory(Subcategory quality) {
        return subCategoryRepository.save(quality);
    }

    public void deleteSubCategory(Subcategory subcategory) {
        subcategory.setVisible(false);
        subCategoryRepository.save(subcategory);
    }
}
