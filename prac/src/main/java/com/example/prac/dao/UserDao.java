package com.example.prac.dao;

import com.example.prac.entity.User;

import java.util.List;


public interface UserDao {

    User getUser(String name);
    void addUser(User user);
    List<User> getUsers();
    void changeBan(Integer id);
}
