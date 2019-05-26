package com.example.prac.service;

import com.example.prac.entity.Order;

import java.util.List;
import java.util.Map;

public interface OrderService {
    List<Map<String,Object>> getOrders(String userName);
    void putOrder(Map<String,Object> orderData);
}
