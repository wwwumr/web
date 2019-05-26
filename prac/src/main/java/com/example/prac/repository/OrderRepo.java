package com.example.prac.repository;

import com.example.prac.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepo extends JpaRepository<Order,Integer> {

    @Query(value = "SELECT * FROM orders WHERE user_name = ?1",nativeQuery = true)
    List<Order> findOrderByUserName(String userName);

    @Query(value = "select count(*) from orders",nativeQuery = true)
    Integer getOrderNum();
}
