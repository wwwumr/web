package com.example.prac.dao;

import com.example.prac.entity.Order;

import java.util.List;

public interface OrderDao {
    List<Order> getOrders(String userName);
    void putOrder(Order order);
}
