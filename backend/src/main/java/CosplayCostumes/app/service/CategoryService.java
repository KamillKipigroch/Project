package CosplayCostumes.app.service;

import CosplayCostumes.app.model.Category;
import CosplayCostumes.app.model.dto.CategoryDTO;
import CosplayCostumes.app.repostitory.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.module.FindException;
import java.util.List;

@Service
@AllArgsConstructor
public class CategoryService {
    private final static String CATEGORY_NO_FOUND = "Failed to find category with name ";
    private final static String CATEGORY_ID_NO_FOUND = "Failed to find category with id ";
    private final static String CATEGORY_EXIST = "Category with this name already exist ! ";
    private final CategoryRepository categoryRepository;

    public List<Category> findAllCategory() {
        return categoryRepository.findAll();
    }

    public Category findCategoryByCode(String code) {
        return categoryRepository.findByCode(code)
                .orElseThrow(() -> new FindException(CATEGORY_NO_FOUND + code));
    }

    public Category findCategoryId(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new FindException(CATEGORY_ID_NO_FOUND + id));
    }

    public Category addCategory(CategoryDTO category) {
        if (categoryRepository.findByCode(category.getCode()).isPresent()) {
            throw new FindException(CATEGORY_EXIST + category.getCode());
        }
        Category newCategory = new Category();
        newCategory.setVisible(true);
        newCategory.setCode(category.getCode());
        return  categoryRepository.save(newCategory);
    }

    public Category updateCategory(Category category) {
        return categoryRepository.save(category);
    }

    public void deleteCategory(Category category) {
        category.setVisible(false);
        categoryRepository.save(category);
    }
}
