package com.example.prac.entity;

import org.hibernate.annotations.Proxy;

import javax.persistence.*;

@Entity
@Proxy(lazy = false)
@Table(name = "detail")
public class Detail {
    @Id
    @GeneratedValue
    @Column(name = "id")
    public Integer id;
    @Column(name = "title")
    public String title;
    @Column(name = "author")
    public String author;
    @Column(name = "img")
    public String img;
    @Column(name = "price")
    public Integer price;
    @Column(name = "remaining")
    public Integer remaining;

    @Column(name = "introduction")
    public String introduction;

    public Detail(){

    }

    public Integer getId(){
        return  id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public String getImg() {
        return img;
    }


    public void setRemaining(Integer remaining) {
        this.remaining = remaining;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getPrice() {
        return price;
    }

    public String getTitle() {
        return title;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setImg(String img) {
        this.img = img;
    }


    public Integer getRemaining() {
        return remaining;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    @Override
    public String toString() {
        return super.toString();
    }
}
