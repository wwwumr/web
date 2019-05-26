package com.example.prac.entity;

import org.hibernate.annotations.Proxy;

import javax.persistence.*;

@Entity
@Proxy(lazy = false)
@Table(name = "orders")
public class Order {
    @Id
    @Column(name = "order_id")
    private Integer orderId;
    @Column(name = "user_name")
    private String userName;
    @Column(name = "order_time")
    private String orderTime;
    @Column(name = "total")
    private Integer total;

    public Order(){

    }

    public Integer getOrderId() {
        return orderId;
    }

    public String getOrderTime() {
        return orderTime;
    }

    public String getUserName() {
        return userName;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public void setOrderTime(String orderTime) {
        this.orderTime = orderTime;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    /*@OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private List<OrderItem> orderItemList;

    @ManyToOne(cascade = {CascadeType.MERGE,CascadeType.REFRESH},optional = false)
    @JoinColumn(name = "userName",referencedColumnName = "name")
    private User user;

    public List<OrderItem> getOrderItemList() {
        return orderItemList;
    }*/
}
