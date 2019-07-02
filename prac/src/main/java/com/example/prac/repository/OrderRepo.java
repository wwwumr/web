package com.example.prac.repository;

import com.example.prac.entity.Order;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepo extends JpaRepository<Order,Integer> {

    @Query(value = "SELECT * FROM orders WHERE user_name = ?1",nativeQuery = true)
    List<Order> findOrderByUserName(String userName);

    @Query(value = "select count(*) from orders",nativeQuery = true)
    Integer getOrderNum();

    @Query(value = "select * from orders where date(order_time) between ?1 and ?2 ", nativeQuery = true)
    List<Order> getPartOrders(String start, String end);

    @Query(value = "select * from orders where date(order_time) between ?1 and ?2 and user_name = ?3", nativeQuery = true)
    List<Order> getPartOrders(String start, String end, String userName);
}
