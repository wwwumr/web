package com.example.prac.controller;

import com.example.prac.dao.DetailDao;
import com.example.prac.dao.OrderDao;
import com.example.prac.entity.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    public OrderDao orderDao;
    @Autowired
    public DetailDao detailDao;

    @GetMapping(value = "/{userName}")
    public Map<String,List<Order>> say(@PathVariable String userName){
        List<Order> orders = orderDao.getOrders(userName);
        Map<String,List<Order>> orderMaps = new HashMap<>();
        for (Order order: orders) {
            String orderId = order.getOrderId();
            if(orderMaps.containsKey(orderId)){
                List<Order> orderList = orderMaps.get(orderId);
                orderList.add(order);
                orderMaps.put(orderId,orderList);
            }else{
                List<Order> orderList = new LinkedList<>();
                ((LinkedList<Order>) orderList).push(order);
                orderMaps.put(orderId,orderList);
            }
        }
        return orderMaps;
    }

    @PostMapping
    public void getPost(@RequestBody List<Order> data){
        for (Order order:data ) {
            orderDao.putOrder(order);
            detailDao.ReduceOne(order.getDetailId(),order.getBookNumber());
        }
    }

    @GetMapping
    public Integer getNum(@RequestParam String userName){
        List<Order> orders = orderDao.getOrders(userName);
        Set<String> userList = new HashSet<>();
        for(int i =0 ; i<orders.size();i++) {
            String orderId = orders.get(i).getOrderId();
            if (!userList.contains(orderId)) {
                userList.add(orderId);
            }
        }
        return userList.size();
    }
}