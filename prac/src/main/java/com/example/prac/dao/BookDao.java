package com.example.prac.dao;

import com.example.prac.entity.Book;

import java.util.List;

public interface BookDao {
    List<Book> findAll();

    Book findOne(Integer id);

    void putOne(Book book);
}
