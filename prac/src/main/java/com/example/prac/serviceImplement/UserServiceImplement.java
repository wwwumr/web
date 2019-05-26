package com.example.prac.serviceImplement;

import com.example.prac.dao.UserDao;
import com.example.prac.entity.User;
import com.example.prac.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImplement implements UserService {
    @Autowired
    private UserDao userDao;

    public User getUser(String name) {
        return userDao.getUser(name);
    }

    public void addUser(User user) {
        userDao.addUser(user);
    }
}
