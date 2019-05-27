package com.example.prac.controller;

import com.example.prac.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    public OrderService orderService;

    @GetMapping(value = "/orderNum")
    public  Integer getOrderNum(){
        return orderService.getOrderNum();
    }

    @GetMapping(value = "/{userName}")
    public List<Map<String,Object>> say(@PathVariable String userName){
        return orderService.getOrders(userName);
    }

    @PostMapping
    public void getPost(@RequestBody Map<String,Object> data){
        orderService.putOrder(data);
    }
}