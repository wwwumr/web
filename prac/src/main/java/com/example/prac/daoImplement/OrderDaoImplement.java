package com.example.prac.daoImplement;

import com.example.prac.dao.OrderDao;
import com.example.prac.entity.Order;
import com.example.prac.repository.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OrderDaoImplement implements OrderDao {
    @Autowired
    private OrderRepo orderRepo;
    public List<Order> getOrders(String userName){
        return orderRepo.findOrderByUserName(userName);
    }

    @Override
    public void putOrder(Order order) {
        orderRepo.save(order);
    }

    @Override
    public Integer getOrderNum() {
        return orderRepo.getOrderNum();
    }
}
