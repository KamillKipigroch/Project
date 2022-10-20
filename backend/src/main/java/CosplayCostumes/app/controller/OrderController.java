package CosplayCostumes.app.controller;

import CosplayCostumes.app.model.Order;
import CosplayCostumes.app.model.Product;
import CosplayCostumes.app.model.dto.OrderDTO;
import CosplayCostumes.app.service.OrderService;
import CosplayCostumes.app.service.ProductService;
import CosplayCostumes.user.model.User;
import CosplayCostumes.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/order")
public class OrderController {
    private final OrderService orderService;
    private final UserService userService;
    private final ProductService productService;

    @GetMapping("/get-all")
    public ResponseEntity<List<Order>> getAllOrder() {
        List<Order> categories = orderService.findAllOrder();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Order> addOrder(@RequestBody OrderDTO orderDTO) {
        Product product = productService.findProductById(orderDTO.getProductID());
        User user = userService.findUserById(orderDTO.getUserID());

        Order newOrder = orderService.addOrder(product, user);

        return new ResponseEntity<>(newOrder, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Order> updateOrder(@RequestBody Order order) {
        Order newOrder = orderService.updateOrder(order);
        return new ResponseEntity<>(newOrder, HttpStatus.OK);
    }

    @PutMapping("/delete")
    public ResponseEntity<Order> deleteOrder(@RequestBody Order order) {
        orderService.deleteOrder(order);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
