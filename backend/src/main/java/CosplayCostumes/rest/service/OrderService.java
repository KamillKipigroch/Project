package CosplayCostumes.rest.service;

import CosplayCostumes.rest.model.Order;
import CosplayCostumes.rest.model.OrderStatus;
import CosplayCostumes.rest.model.Product;
import CosplayCostumes.rest.model.dto.order.OrderDTO;
import CosplayCostumes.rest.repostitory.OrderRepository;
import CosplayCostumes.security.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Value;
import org.springframework.stereotype.Service;

import java.lang.module.FindException;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class OrderService {
    private final static String ORDER_NO_FOUND = "Failed to find order with name ";
    private final static String ORDER_ID_NO_FOUND = "Failed to find order with id ";
    private final static String ORDERS_MAX_SIZE = "Failed ! You have reached your order limit ";

    private final static long MAX_ORDERS = 5;
    private final OrderRepository orderRepository;

    public List<Order> findAllOrder() {
        return orderRepository.findAll();
    }

    public Order findOrderById(Long id) {
        return orderRepository.findById(id).orElseThrow(() -> new FindException(ORDER_ID_NO_FOUND + id));
    }

    public List<Order> findOrderByUserAndProduct(User user, Product product) {
        return orderRepository.findOrderByUserAndProduct(user, product).orElseThrow(() -> new FindException(ORDER_NO_FOUND + user.getEmail() + product.getBusinessKey()));
    }

    public List<Order> findOrderByProduct(Product product) {
        var orders = orderRepository.findOrderByProduct(product).orElseThrow(() -> new FindException(ORDER_NO_FOUND + product.getBusinessKey()));
        var now = LocalDate.now();
        orders = orders.stream().filter(order -> !order.getIsFinished()).toList();
        orders.forEach(order -> {
                    if (order.getDateEnd().isBefore(now))
                        order.setDateEnd(now);
                });
        return orders;
    }

    public Order addOrder(Product product, User user, OrderStatus status, OrderDTO orderDTO) {
        var orders = orderRepository.findOrderByUser(user).orElseThrow(() -> new FindException(ORDER_NO_FOUND + product.getBusinessKey()))
                .stream().filter(order -> !order.getIsFinished()).toList();

        if(orders.size() >= MAX_ORDERS)
            throw new FindException(ORDERS_MAX_SIZE);

        Order order = new Order(product, user);
        order.setOrderStatus(status);
        order.setDateStart(LocalDate.now());
        order.setIsFinished(false);
        return orderRepository.save(order);
    }

    public void deleteOrder(Order order) {
        orderRepository.findById(order.getId()).orElseThrow(() ->
                new FindException(ORDER_ID_NO_FOUND + order.getId()));
        order.setVisible(false);
        orderRepository.save(order);
    }

    public Order updateOrderStatus(Long orderId, OrderStatus orderStatus, boolean isLast) {
        Order or = orderRepository.findById(orderId).orElseThrow(() ->
                new FindException(ORDER_ID_NO_FOUND + orderId));

        if(isLast) {
            or.setDateEnd(LocalDate.now());
            var product = or.getProduct();
            product.setPrice(
                    (product.getPrice() * product.getCondition().getPrice()) / 100);
            var days = Math.abs( Duration.between( or.getDateEnd().atStartOfDay(),or.getDateStart().atStartOfDay()).toDays() - 1);
            or.setPrice(product.getPrice()*days);
        }
        or.setIsFinished(isLast);
        or.setOrderStatus(orderStatus);

        return orderRepository.save(or);
    }
}
