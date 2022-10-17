package CosplayCostumes.app.controller;

import CosplayCostumes.app.model.Category;
import CosplayCostumes.app.model.Subcategory;
import CosplayCostumes.app.service.SubCategoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/sub-category")
public class SubCategoryController {
    private final SubCategoryService subCategoryService;

    @GetMapping("/get-all")
    public ResponseEntity<List<Subcategory>> getAll() {
        List<Subcategory> allSubCategory = subCategoryService.findAllSubCategory();
        return new ResponseEntity<>(allSubCategory, HttpStatus.OK);
    }

    @GetMapping("/find/{code}")
    public ResponseEntity<Subcategory> findByCode(@PathVariable("code") String code) throws Exception {
        Subcategory categoryByCode = subCategoryService.findSubCategoryByCode(code);
        return new ResponseEntity<>(categoryByCode, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Subcategory> addSubcategory(@RequestBody Subcategory subcategory) {
        Subcategory addSubCategory = subCategoryService.addSubCategory(subcategory);
        return new ResponseEntity<>(addSubCategory, HttpStatus.OK);
    }
}
