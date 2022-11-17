package CosplayCostumes.rest.controller;

import CosplayCostumes.rest.model.Order;
import CosplayCostumes.rest.model.OrderStatus;
import CosplayCostumes.rest.model.Product;
import CosplayCostumes.rest.model.dto.ModelDTO;
import CosplayCostumes.rest.model.dto.order.OrderDTO;
import CosplayCostumes.rest.model.dto.order.OrderResponse;
import CosplayCostumes.rest.service.OrderService;
import CosplayCostumes.rest.service.OrderStatusService;
import CosplayCostumes.rest.service.ProductService;
import CosplayCostumes.security.user.model.User;
import CosplayCostumes.security.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static CosplayCostumes.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@RestController
@AllArgsConstructor
@RequestMapping("/api/order")
public class OrderController {
    private final OrderService orderService;
    private final UserService userService;
    private final OrderStatusService orderStatusService;
    private final ProductService productService;

    @GetMapping("/get-all-objects")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<List<OrderResponse>> getAllOrder() {
        List<Order> orders = orderService.findAllOrder();
        List<OrderResponse> response = new ArrayList<>();
        orders.forEach(order -> response.add(orderMapper(order)));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/add-object")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<Order> addOrder(@RequestBody OrderDTO orderDTO) {
        Product product = productService.findProductById(orderDTO.getProductID());
        User user = userService.findUserById(orderDTO.getUserID());

        Order newOrder = orderService.addOrder(product, user);

        return new ResponseEntity<>(newOrder, HttpStatus.OK);
    }

    @PutMapping("/update-status-object")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<OrderResponse> updateOrderStatus(@RequestBody OrderResponse order) {
        OrderStatus orderStatus = orderStatusService.findOrderStatusById(order.getStatusId());
        Order newOrder = orderService.updateOrderStatus(order.getId(), orderStatus);
        OrderResponse response = orderMapper(newOrder);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/delete-object")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<HttpStatus> deleteOrder(@RequestBody ModelDTO modelDTO) {
        orderService.deleteOrder(orderService.findOrderById(modelDTO.getId()));

        return new ResponseEntity<>(HttpStatus.OK);
    }

    private OrderResponse orderMapper(Order order){
        return new OrderResponse(order.getId(),order.getOrderStatus().getId(), order.getOrderStatus().getCode(), order.getProduct().getId(), order.getProduct().getCode(),
                order.getUser().getId(), order.getUser().getFirstName() + " " + order.getUser().getLastName());
    }
}
