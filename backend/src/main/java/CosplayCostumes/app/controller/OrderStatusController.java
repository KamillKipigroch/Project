package CosplayCostumes.app.controller;

import CosplayCostumes.app.model.OrderStatus;
import CosplayCostumes.app.model.dto.OrderStatusDTO;
import CosplayCostumes.app.service.OrderStatusService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/order-status")
public class OrderStatusController {
    private final OrderStatusService orderStatusService;

    @GetMapping("/get-all")
    public ResponseEntity<List<OrderStatus>> getAllOrderStatues() {
        List<OrderStatus> orderStatus = orderStatusService.findAllOrderStatus();
        return new ResponseEntity<>(orderStatus, HttpStatus.OK);
    }

    @GetMapping("/find/{code}")
    public ResponseEntity<OrderStatus> findCategory(@PathVariable("code") String code) throws Exception {
        OrderStatus orderStatus = orderStatusService.findOrderStatusByCode(code);
        return new ResponseEntity<>(orderStatus, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<OrderStatus> addCategory(@RequestBody OrderStatusDTO orderStatusDTO) {
        OrderStatus newCategory = orderStatusService.addOrderStatus(orderStatusDTO);
        return new ResponseEntity<>(newCategory, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<OrderStatus> updateCategory(@RequestBody OrderStatus orderStatus) {
        OrderStatus newCategory = orderStatusService.updateOrderStatus(orderStatus);
        return new ResponseEntity<>(newCategory, HttpStatus.OK);
    }

    @PutMapping("/delete")
    public ResponseEntity<OrderStatus> deleteCategory(@RequestBody OrderStatus orderStatus) {
        orderStatusService.deleteOrderStatus(orderStatus);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
