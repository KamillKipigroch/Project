package CosplayCostumes.rest.controller;

import CosplayCostumes.rest.model.Subcategory;
import CosplayCostumes.rest.model.dto.ModelDTO;
import CosplayCostumes.rest.model.dto.subcategory.SubcategoryDTO;
import CosplayCostumes.rest.service.SubCategoryService;
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
@RequestMapping("/api/sub-category")
public class SubCategoryController {
    private final SubCategoryService subCategoryService;

    @GetMapping("/get-all")
    public ResponseEntity<List<Subcategory>> getAllSubCategories() {
        List<Subcategory> allSubCategory = subCategoryService.findAllSubCategory();
        return new ResponseEntity<>(allSubCategory, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Subcategory> findSubcategoryById(@PathVariable("id") Long id) {
        Subcategory categoryByCode = subCategoryService.findSubCategoryById(id);
        return new ResponseEntity<>(categoryByCode, HttpStatus.OK);
    }

    @PostMapping("/add")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<Subcategory> addSubcategory(@RequestBody SubcategoryDTO subcategory) {
        Subcategory addSubCategory = subCategoryService.addSubCategory(subcategory);
        return new ResponseEntity<>(addSubCategory, HttpStatus.OK);
    }

    @PutMapping("/update")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<Subcategory> updateSubcategory(@RequestBody Subcategory subcategory) {
        Subcategory newQuality = subCategoryService.updateSubCategory(subcategory);
        return new ResponseEntity<>(newQuality, HttpStatus.OK);
    }

    @PutMapping("/disable-visibility")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<HttpStatus> deleteSubcategory(@RequestBody ModelDTO modelDTO) {
        subCategoryService.deleteSubCategory(modelDTO.getId());
        return new ResponseEntity<>(HttpStatus.OK, HttpStatus.OK);
    }
}
