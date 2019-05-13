package com.example.prac.entity;

import com.fasterxml.jackson.annotation.JsonAlias;
import jdk.nashorn.internal.objects.annotations.Getter;
import jdk.nashorn.internal.objects.annotations.Setter;

import javax.persistence.*;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue
    private Integer id;
    @Column(name = "user_name")
    private String userName;
    @Column(name = "detail_id")
    private Integer detailId;
    @Column(name = "book_number")
    private Integer bookNumber;
    @Column(name = "order_id")
    private String orderId;

    public Order(){

    }
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    public Integer getDetailId() {
        return detailId;
    }

    public Integer getBookNumber() {
        return bookNumber;
    }

    public String getUserName() {
        return userName;
    }

    public void setDetailId(Integer detailId) {
        this.detailId = detailId;
    }

    public void setBookNumber(Integer bookNumber) {
        this.bookNumber = bookNumber;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    @Override
    public String toString() {
        return super.toString();
    }
}
