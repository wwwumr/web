package com.example.prac.controller;

import com.example.prac.dao.UserDao;

import com.example.prac.entity.User;
import com.example.prac.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping(value = "/logIn")
    public User getUser(@RequestParam String userName){
        return userService.getUser(userName);
    }

    @PostMapping(value = "/logIn")
    public void addUser(@RequestBody User user){
        userService.addUser(user);
    }

}
