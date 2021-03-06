package com.example.prac.service;

import com.example.prac.entity.Book;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface BookService {
     List<Book> findAll();
     Book findBook(Integer bookId);
     void saveBook(Book data);
     Integer getKey();
     void removeBook(List<Integer> ids);
}
