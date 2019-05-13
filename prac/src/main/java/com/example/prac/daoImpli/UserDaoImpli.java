package com.example.prac.daoImpli;

import com.example.prac.repository.UserRepo;
import com.example.prac.dao.UserDao;
import com.example.prac.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDaoImpli implements UserDao {
    @Autowired
    private UserRepo userRepo;


    public User getUser(String name){
        List<User> userList = userRepo.findAll();

        for (User user : userList){
            if(name.equals(user.getName())){
                return user;
            }
        }
        return null;
    }

    public void addUser(User user){
        userRepo.save(user);
    }

    public void deleteUser(String name){
        List<User> userList = userRepo.findAll();
        for (User user : userList){
            if(user.getName().equals(name)){
                userRepo.deleteById(user.getId());
            }
        }
    }
}
