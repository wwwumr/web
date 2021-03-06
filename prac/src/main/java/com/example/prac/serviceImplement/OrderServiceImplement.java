package com.example.prac.serviceImplement;


import com.example.prac.dao.BookDao;
import com.example.prac.dao.OrderDao;
import com.example.prac.dao.OrderItemDao;
import com.example.prac.entity.Book;
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
    @Autowired
    private BookDao bookDao;

    public List<Map<String,Object>> getOrders(String userName) {
        List<Order> orderList = orderDao.getOrders(userName);
        return getJson(orderList);
    }

    @Override
    public List<Map<String, Object>> getOrders() {
        List<Order> orderList = orderDao.getOrders();
        return getJson(orderList);
    }

    public List<Map<String,Object>> getPartOrders(String start, String end) {
        List<Order> orderList = orderDao.getPartOrders(start, end);
        return getJson(orderList);
    }

    @Override
    public List<Map<String, Object>> getPartOrders(String start, String end, String userName) {
        List<Order> orderList = orderDao.getPartOrders(start, end, userName);
        return getJson(orderList);
    }

    public void putOrder(Map<String,Object> orderData) {
        Integer orderId = orderDao.getOrderNum();
        parseOrder(orderData,orderId);
        parseOrderItem(orderData,orderId);
    }

    public Integer getOrderNum(){
        return orderDao.getOrderNum();
    }

    private void parseOrder(Map<String,Object> orderData,Integer orderId){
        Order order = new Order();
        order.setOrderId(orderId);
        order.setUserName((String) orderData.get("user_name"));
        order.setOrderTime((String) orderData.get("order_time"));
        order.setTotal((Integer) orderData.get("total"));
        System.out.println(order);
        orderDao.putOrder(order);
    }

    private void parseOrderItem(Map<String,Object> orderData,Integer orderId){
        List<Map<String,Object>> orderItemList = (List<Map<String,Object>>)orderData.get("items");
        List<OrderItem> targetOrder = new LinkedList<>();
        for (Map<String,Object> orderItemObject: orderItemList) {
            OrderItem orderItem = new OrderItem();
            OrderItemKey orderItemKey = new OrderItemKey();
            orderItemKey.setBookId((Integer) orderItemObject.get("book_id"));
            orderItemKey.setOrderId(orderId);
            orderItem.setOrderItemKey(orderItemKey);
            Integer amount = (Integer) orderItemObject.get("amount");
            orderItem.setAmount(amount);
            targetOrder.add(orderItem);
            Book book = bookDao.findOne((Integer)orderItemObject.get("book_id"));
            Integer remaining = book.getRemaining();
            book.setRemaining(remaining - amount);
            bookDao.putOne(book);
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