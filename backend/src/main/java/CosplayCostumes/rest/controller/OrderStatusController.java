package CosplayCostumes.rest.controller;

import CosplayCostumes.rest.model.OrderStatus;
import CosplayCostumes.rest.model.dto.orderStatus.OrderStatusDTO;
import CosplayCostumes.rest.service.OrderStatusService;
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
@RequestMapping("/api/order-status")
public class OrderStatusController {
    private final OrderStatusService orderStatusService;

    @GetMapping("/get-all-object")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<List<OrderStatus>> getAllOrderStatues() {
        List<OrderStatus> orderStatus = orderStatusService.findAllOrderStatus();
        return new ResponseEntity<>(orderStatus, HttpStatus.OK);
    }

    @GetMapping("/find-object/{code}")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<OrderStatus> findCategory(@PathVariable("code") String code) throws Exception {
        OrderStatus orderStatus = orderStatusService.findOrderStatusByCode(code);
        return new ResponseEntity<>(orderStatus, HttpStatus.OK);
    }

    @PostMapping("/add")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<OrderStatus> addCategory(@RequestBody OrderStatusDTO orderStatusDTO) {
        OrderStatus newCategory = orderStatusService.addOrderStatus(orderStatusDTO);
        return new ResponseEntity<>(newCategory, HttpStatus.OK);
    }

    @PutMapping("/update")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<OrderStatus> updateCategory(@RequestBody OrderStatus orderStatus) {
        OrderStatus newCategory = orderStatusService.updateOrderStatus(orderStatus);
        return new ResponseEntity<>(newCategory, HttpStatus.OK);
    }

    @PutMapping("/delete")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<OrderStatus> deleteCategory(@RequestBody OrderStatus orderStatus) {
        orderStatusService.deleteOrderStatus(orderStatus);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
