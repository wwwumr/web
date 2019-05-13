package com.example.prac.controller;

import com.example.prac.dao.UserDao;

import com.example.prac.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserDao userDao;

    @GetMapping(value = "/logIn")
    public User getUser(@RequestParam String userName){
        return userDao.getUser(userName);
    }

    @PostMapping(value = "/logIn")
    public void addUser(@RequestBody User user){
        userDao.addUser(user);
    }
    @DeleteMapping(value = "/logIn")
    public void deleteUser(@RequestParam String userName){
        userDao.deleteUser(userName);
    }
}
