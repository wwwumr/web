package com.example.prac.dao;

import com.example.prac.entity.User;
import org.springframework.stereotype.Repository;


public interface UserDao {

    User getUser(String name);
    void addUser(User user);

}
