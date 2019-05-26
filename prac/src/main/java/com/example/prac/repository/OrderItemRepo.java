package com.example.prac.repository;

import com.example.prac.entity.OrderItem;
import com.example.prac.entity.OrderItemKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderItemRepo extends JpaRepository<OrderItem, OrderItemKey> {

    @Query(value = "select * from order_item where order_id=?1",nativeQuery = true)
    List<OrderItem> findOrderItemByOrderId(Integer orderId);
}
