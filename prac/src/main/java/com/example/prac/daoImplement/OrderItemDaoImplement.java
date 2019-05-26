package com.example.prac.daoImplement;

import com.example.prac.dao.OrderItemDao;
import com.example.prac.entity.OrderItem;
import com.example.prac.repository.OrderItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OrderItemDaoImplement implements OrderItemDao {
    @Autowired
    private OrderItemRepo orderItemRepo;

    public List<OrderItem> getOrderItems(Integer orderId) {
        return orderItemRepo.findOrderItemByOrderId(orderId);
    }

    public void putOrderItems(List<OrderItem> orderItemList) {
        for (OrderItem orderItem:orderItemList) {
            orderItemRepo.save(orderItem);
        }
    }
}
