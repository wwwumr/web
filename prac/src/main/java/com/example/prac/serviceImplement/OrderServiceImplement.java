package com.example.prac.serviceImplement;

import com.example.prac.dao.OrderDao;
import com.example.prac.dao.OrderItemDao;
import com.example.prac.entity.Order;
import com.example.prac.entity.OrderItem;
import com.example.prac.entity.OrderItemKey;
import com.example.prac.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Service
public class OrderServiceImplement implements OrderService {
    @Autowired
    private OrderDao orderDao;
    @Autowired
    private OrderItemDao orderItemDao;

    public List<Map<String,Object>> getOrders(String userName) {
        List<Order> orderList = orderDao.getOrders(userName);
        return getJson(orderList);

    }

    public void putOrder(Map<String,Object> orderData) {
        parseOrder(orderData);
        parseOrderItem(orderData);
    }

    private void parseOrder(Map<String,Object> orderData){
        Order order = new Order();
        order.setOrderId((Integer) orderData.get("order_id"));
        order.setUserName((String) orderData.get("user_name"));
        order.setOrderTime((String) orderData.get("order_time"));
        order.setTotal((Integer) orderData.get("total"));
        System.out.println(order);
        orderDao.putOrder(order);
    }

    private void parseOrderItem(Map<String,Object> orderData){
        List<Map<String,Object>> orderItemList = (List<Map<String,Object>>)orderData.get("items");
        List<OrderItem> targetOrder = new LinkedList<>();
        for (Map<String,Object> orderItemObject: orderItemList) {
            OrderItem orderItem = new OrderItem();
            OrderItemKey orderItemKey = new OrderItemKey();
            orderItemKey.setBookId((Integer) orderItemObject.get("book_id"));
            orderItemKey.setOrderId((Integer)orderItemObject.get("order_id"));
            orderItem.setOrderItemKey(orderItemKey);
            orderItem.setAmount((Integer) orderItemObject.get("amount"));
            targetOrder.add(orderItem);
        }
        orderItemDao.putOrderItems(targetOrder);
    }

    private List<Map<String,Object>> getJson(List<Order> orderList){
        List<Map<String,Object>> orderData = new LinkedList<>();
        for (Order order:orderList) {
            Map<String,Object> oneOrder = new HashMap<>();
            oneOrder.put("order_id",order.getOrderId());
            oneOrder.put("user_name",order.getUserName());
            oneOrder.put("order_time",order.getOrderTime());
            oneOrder.put("total",order.getTotal());
            List<OrderItem> orderItemList = orderItemDao.getOrderItems(order.getOrderId());
            oneOrder.put("items",orderItemList);
            orderData.add(oneOrder);
        }
        return orderData;
    }
}

/*get method sample
[
  {
    "total": 69,
    "user_name": "user",
    "order_time": "2019-05-01 11:23:05",
    "order_id": 0,
    "items": [
      {
        "orderItemKey": {
          "orderId": 0,
          "bookId": 0
        },
        "amount": 1
      },
      {
        "orderItemKey": {
          "orderId": 0,
          "bookId": 1
        },
        "amount": 1
      }
    ]
  }
]
*/
/*
 {
    "total": 69,
    "user_name": "user",
    "order_time": "2019-05-01 11:23:05",
    "order_id": 0,
    "items": [
      {
          "order_id": 1,
          "book_id": 0,
        "amount": 1
      },
      {
          "order_id": 1,
          "book_id": 1,
        "amount": 1
      }
    ]
 }

*/