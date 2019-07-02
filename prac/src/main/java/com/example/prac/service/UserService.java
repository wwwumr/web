package com.example.prac.service;

import com.example.prac.entity.User;

import java.util.List;

public interface UserService {

    User getUser(String name);
    void addUser(User user);
    List<User> getUsers();
    void changeBan(Integer id);
}
