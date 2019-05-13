package com.example.prac.dao;

import com.example.prac.entity.User;



public interface UserDao {

    User getUser(String name);
    void addUser(User user);
    void deleteUser(String name);

}
