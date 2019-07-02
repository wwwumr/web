package com.example.prac.daoImplement;

import com.example.prac.repository.UserRepo;
import com.example.prac.dao.UserDao;
import com.example.prac.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDaoImplement implements UserDao {
    @Autowired
    private UserRepo userRepo;

    @Override
    public List<User> getUsers() {
        return userRepo.findAll();
    }

    public User getUser(String name){
        return userRepo.findUserByName(name);
    }

    public void addUser(User user){
        userRepo.save(user);
    }

    @Override
    public void changeBan(Integer id) {
        User user = userRepo.findUserByUserId(id);
        System.out.println(user.getBan());
        if (user.getBan() == null) {
            user.setBan("2019-07-03 16:56:36");
        } else {
            user.setBan(null);
        }
        userRepo.save(user);
    }

}
