package CosplayCostumes.app.service;

import CosplayCostumes.app.model.Order;
import CosplayCostumes.app.model.Product;
import CosplayCostumes.app.repostitory.OrderRepository;
import CosplayCostumes.user.model.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class OrderService {
    private final static String ORDER_NO_FOUND = "Failed to find order with name";

    private final OrderRepository orderRepository;

    public List<Order> findAllOrder() {
        return orderRepository.findAll();
    }

    public List<Order> findOrderByUserAndProduct(User user, Product product) throws Exception {
        return orderRepository.findOrderByUserAndProduct(user, product).orElseThrow(() -> new Exception(ORDER_NO_FOUND + user.getEmail() + product.getBusinessKey()));
    }

    public Order addOrder(Order order) {
        return orderRepository.save(order);
    }

    public Order updateOrder(Order order) {
        return orderRepository.save(order);
    }

    public void deleteOrder(Order order) {
        order.setVisible(false);
        orderRepository.save(order);
    }
}
