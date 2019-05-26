package com.example.prac.service;

import com.example.prac.entity.User;
import org.springframework.stereotype.Service;

public interface UserService {

    User getUser(String name);
    void addUser(User user);
}
