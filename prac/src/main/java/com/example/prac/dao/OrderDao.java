package com.example.prac.dao;

import com.example.prac.entity.Order;

import java.util.List;
import java.util.Map;

public interface OrderDao {
    List<Order> getOrders(String userName);
    List<Order> getOrders();
    void putOrder(Order order);
    Integer getOrderNum();
    List<Order> getPartOrders(String start, String end);
    List<Order> getPartOrders(String start, String end, String userName);
}
