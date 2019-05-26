package com.example.prac.service;

import com.example.prac.entity.Book;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BookService {
     List<Book> findAll();

     Book findBook(Integer bookId);
}
