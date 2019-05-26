package com.example.prac.dao;

import com.example.prac.entity.OrderItem;

import java.util.List;

public interface OrderItemDao {

    List<OrderItem> getOrderItems(Integer OrderId);

    void putOrderItems(List<OrderItem> orderItemList);
}
