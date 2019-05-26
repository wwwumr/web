package com.example.prac.repository;

import com.example.prac.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepo extends JpaRepository<User,Integer> {

    @Query(value = "SELECT u FROM User u WHERE u.name=:userName")
    User findUserByName(@Param("userName") String userName);

}
