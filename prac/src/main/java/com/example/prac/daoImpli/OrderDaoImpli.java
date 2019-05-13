package com.example.prac.daoImpli;

import com.example.prac.dao.OrderDao;
import com.example.prac.entity.Order;
import com.example.prac.repository.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.LinkedList;
import java.util.List;

@Repository
public class OrderDaoImpli implements OrderDao {
    @Autowired
    private OrderRepo orderRepo;
    public List<Order> getOrders(String userName){
        List<Order> orderList = orderRepo.findAll();
        List<Order> orders = new LinkedList<>();
        for(int i =0 ; i<orderList.size();i++){
            if(orderList.get(i).getUserName().equals(userName)){
                orders.add(orderList.get(i));
            }
        }
        return orders;
    }

    @Override
    public void putOrder(Order order) {
        orderRepo.save(order);
    }
}
