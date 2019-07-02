package com.example.prac.controller;


import com.example.prac.entity.User;
import com.example.prac.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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

    @GetMapping(value = "/id")
    public List<User> getUsers(){
        return userService.getUsers();
    }

    @PostMapping(value = "/change")
    public void changeBan(@RequestBody Integer[] ids) {
        userService.changeBan(ids[0]);
    }
}
