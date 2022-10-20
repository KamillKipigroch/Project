package CosplayCostumes.app.controller;

import CosplayCostumes.app.model.Category;
import CosplayCostumes.app.model.Opinion;
import CosplayCostumes.app.model.dto.CategoryDTO;
import CosplayCostumes.app.service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/category")
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("/get-all")
    public ResponseEntity<List<Category>> getAllCategory() {
        List<Category> categories = categoryService.findAllCategory();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/find/{code}")
    public ResponseEntity<Category> findCategory(@PathVariable("code") String code) {
        Category category = categoryService.findCategoryByCode(code);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Category> addCategory(@RequestBody CategoryDTO category) {
        Category newCategory = categoryService.addCategory(category);
        return new ResponseEntity<>(newCategory, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Category> updateCategory(@RequestBody Category category) {
        Category newCategory = categoryService.updateCategory(category);
        return new ResponseEntity<>(newCategory, HttpStatus.OK);
    }

    @PutMapping("/delete")
    public ResponseEntity<Opinion> deleteCategory(@RequestBody Category category) {
        categoryService.deleteCategory(category);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
