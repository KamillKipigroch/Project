package CosplayCostumes.rest.service;

import CosplayCostumes.rest.model.Order;
import CosplayCostumes.rest.model.OrderStatus;
import CosplayCostumes.rest.model.Product;
import CosplayCostumes.rest.model.dto.order.OrderDTO;
import CosplayCostumes.rest.model.dto.order.OrderResponse;
import CosplayCostumes.rest.model.dto.orderStatus.OrderStatusDTO;
import CosplayCostumes.rest.repostitory.OrderRepository;
import CosplayCostumes.security.user.model.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.module.FindException;
import java.util.List;

@Service
@AllArgsConstructor
public class OrderService {
    private final static String ORDER_NO_FOUND = "Failed to find order with name ";
    private final static String ORDER_ID_NO_FOUND = "Failed to find order with id ";
    private final OrderRepository orderRepository;

    public List<Order> findAllOrder() {
        return orderRepository.findAll();
    }
    public Order findOrderById(Long id) {
        return orderRepository.findById(id).orElseThrow(()-> new FindException(ORDER_ID_NO_FOUND + id));
    }

    public List<Order> findOrderByUserAndProduct(User user, Product product) throws Exception {
        return orderRepository.findOrderByUserAndProduct(user, product).orElseThrow(() -> new Exception(ORDER_NO_FOUND + user.getEmail() + product.getBusinessKey()));
    }

    public Order addOrder(Product product, User user) {
        Order order = new Order(product, user);
        return orderRepository.save(order);
    }

    public void deleteOrder(Order order) {
        orderRepository.findById(order.getId()).orElseThrow(() ->
                new FindException(ORDER_ID_NO_FOUND + order.getId()));
        order.setVisible(false);
        orderRepository.save(order);
    }

    public Order updateOrderStatus(Long orderId, OrderStatus orderStatus) {
        Order or = orderRepository.findById(orderId).orElseThrow(() ->
                new FindException(ORDER_ID_NO_FOUND + orderId));
        or.setOrderStatus(orderStatus);
        return orderRepository.save(or);
    }
}
