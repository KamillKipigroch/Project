package CosplayCostumes.app.service;

import CosplayCostumes.app.model.OrderStatus;
import CosplayCostumes.app.repostitory.OrderStatusRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.module.FindException;
import java.util.List;

@Service
@AllArgsConstructor
public class OrderStatusService {
    private final static String ORDER_STATUS_NO_FOUND = "Failed to find order status with name";

    private final static String ORDER_STATUS_EXIST = "Order status with this name is already exist ! ";

    private final OrderStatusRepository orderStatusRepository;

    public List<OrderStatus> findAllOrderStatus() {
        return orderStatusRepository.findAll();
    }

    public OrderStatus findOrderStatusByCode(String code) throws Exception {
        return orderStatusRepository.findByCode(code).orElseThrow(() -> new Exception(ORDER_STATUS_NO_FOUND + code));
    }

    public OrderStatus addOrderStatus(OrderStatus orderStatus) {
        if (orderStatusRepository.findByCode(orderStatus.getCode()).isPresent())
            throw new FindException(ORDER_STATUS_EXIST);
        return orderStatusRepository.save(orderStatus);
    }

    public OrderStatus updateOrderStatus(OrderStatus orderStatus) {
        return orderStatusRepository.save(orderStatus);
    }

    public void deleteOrderStatus(OrderStatus orderStatus) {
        orderStatus.setVisible(false);
        orderStatusRepository.save(orderStatus);
    }
}
