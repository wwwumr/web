package com.example.prac.dao;

import com.example.prac.entity.Detail;

import java.util.List;

public interface DetailDao {
    List<Detail> findAll();

    Detail findOne(Integer id);

    void ReduceOne(Integer id,Integer num);

}
