package com.example.prac.dao;

import com.example.prac.entity.Book;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface BookDao {
    List<Book> findAll();

    Book findOne(Integer id);

}
