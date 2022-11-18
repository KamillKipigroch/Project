package CosplayCostumes.rest.service;

import CosplayCostumes.rest.model.OrderStatus;
import CosplayCostumes.rest.model.dto.orderStatus.OrderStatusDTO;
import CosplayCostumes.rest.repostitory.OrderStatusRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.module.FindException;
import java.util.List;

@Service
@AllArgsConstructor
public class OrderStatusService {
    private final static String ORDER_STATUS_NO_FOUND = "Failed to find order status with name";
    private final static String ORDER_STATUS_NO_FOUND_ID = "Failed to find order status with id";
    private final static String ORDER_STATUS_NO_EXIST = "Failed to find order status";
    private final static String ORDER_STATUS_EXIST = "Order status with this name is already exist ! ";
    private final OrderStatusRepository orderStatusRepository;

    public List<OrderStatus> findAllOrderStatus() {
        return orderStatusRepository.findAll();
    }

    public OrderStatus findOrderStatusByCode(String code){
        return orderStatusRepository.findByCode(code).orElseThrow(() -> new FindException(ORDER_STATUS_NO_FOUND + code));
    }
    public OrderStatus findOrderStatusById(Long id) {
        return orderStatusRepository.findById(id).orElseThrow(() -> new FindException(ORDER_STATUS_EXIST));
    }

    public OrderStatus findLowestStatus() {
        int minLevel = orderStatusRepository.findAll().stream().mapToInt(OrderStatus::getLevel).min().orElseThrow( () -> new FindException(ORDER_STATUS_NO_EXIST));

        return orderStatusRepository.findByLevel(minLevel).orElseThrow( () -> new FindException(ORDER_STATUS_NO_EXIST));
    }


    public OrderStatus addOrderStatus(OrderStatusDTO orderStatus) {
        if (orderStatusRepository.findByCode(orderStatus.getCode()).isPresent())
            throw new FindException(ORDER_STATUS_EXIST);

        OrderStatus newOrderStatus = new OrderStatus(orderStatus.getCode(), orderStatus.getLevel());
        return orderStatusRepository.save(newOrderStatus);
    }

    public OrderStatus updateOrderStatus(OrderStatus orderStatus) {
        OrderStatus order = orderStatusRepository.findById(orderStatus.getId()).orElseThrow(() ->
                new FindException(ORDER_STATUS_NO_FOUND_ID + orderStatus.getId()));
        order.setCode(orderStatus.getCode());
        order.setVisible(orderStatus.getVisible());

        return orderStatusRepository.save(order);
    }

    public void deleteOrderStatus(Long id) {
        OrderStatus orderStatus = orderStatusRepository.findById(id).orElseThrow( () ->
             new FindException(ORDER_STATUS_EXIST));
        orderStatus.setVisible(false);
        orderStatusRepository.save(orderStatus);
    }
}
