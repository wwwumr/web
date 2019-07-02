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

    @GetMapping(value = "/id")
    public List<Map<String, Object>> getOrders() {
        return  orderService.getOrders();
    }

    @GetMapping(value = "/part")
    public List<Map<String, Object>> getPartOrders(@RequestParam String start, @RequestParam String end) {
        return orderService.getPartOrders(start, end);
    }

    @GetMapping(value = "/part/{userName}")
    public List<Map<String, Object>> getPartOrders(@RequestParam String start,
                                                   @RequestParam String end,
                                                   @PathVariable String userName) {
        return orderService.getPartOrders(start, end, userName);
    }
    @PostMapping
    public void getPost(@RequestBody Map<String,Object> data){
        orderService.putOrder(data);
    }
}