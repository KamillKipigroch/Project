package CosplayCostumes.rest.controller;

import CosplayCostumes.rest.model.Category;
import CosplayCostumes.rest.model.dto.ModelDTO;
import CosplayCostumes.rest.model.dto.category.CategoryDTO;
import CosplayCostumes.rest.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static CosplayCostumes.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@RestController
@AllArgsConstructor
@RequestMapping("/api/category")
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

    @GetMapping("/find/{id}")
    public ResponseEntity<Category> findCategoryById(@PathVariable("id") Long id) {
        Category category = categoryService.findCategoryById(id);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @PostMapping("/add")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<Category> addCategory(@RequestBody CategoryDTO category) {
        Category newCategory = categoryService.addCategory(category);
        return new ResponseEntity<>(newCategory, HttpStatus.OK);
    }

    @PutMapping("/update")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<Category> updateCategory(@RequestBody Category category) {
        Category newCategory = categoryService.updateCategory(category);
        return new ResponseEntity<>(newCategory, HttpStatus.OK);
    }

    @PutMapping("/delete")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<HttpStatus> deleteCategory(@RequestBody ModelDTO modelDTO) {
        categoryService.deleteCategory(modelDTO.getId());
        return new ResponseEntity<>(HttpStatus.OK,HttpStatus.OK);
    }
}
