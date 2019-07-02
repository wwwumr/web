package com.example.prac.service;


import java.util.List;
import java.util.Map;

public interface OrderService {
    List<Map<String,Object>> getOrders(String userName);
    void putOrder(Map<String,Object> orderData);
    Integer getOrderNum();
    List<Map<String,Object>> getOrders();
    List<Map<String,Object>> getPartOrders(String start, String end);
    List<Map<String,Object>> getPartOrders(String start, String end, String userName);
}
