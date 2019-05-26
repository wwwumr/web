package com.example.prac.daoImplement;

import com.example.prac.repository.UserRepo;
import com.example.prac.dao.UserDao;
import com.example.prac.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserDaoImplement implements UserDao {
    @Autowired
    private UserRepo userRepo;


    public User getUser(String name){
        return userRepo.findUserByName(name);
    }

    public void addUser(User user){
        userRepo.save(user);
    }

}
