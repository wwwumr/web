package com.example.prac.entity;


import org.hibernate.annotations.Proxy;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Proxy(lazy = false)
@Table(name = "order_item")
public class OrderItem {

    @EmbeddedId
    private OrderItemKey orderItemKey;

    @Column(name = "amount")
    private Integer amount;

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }


    public OrderItemKey getOrderItemKey() {
        return orderItemKey;
    }


    public void setOrderItemKey(OrderItemKey orderItemKey) {
        this.orderItemKey = orderItemKey;
    }


    /*@ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book book;*/
}

