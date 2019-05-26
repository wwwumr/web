package com.example.prac.serviceImplement;

import com.example.prac.dao.BookDao;
import com.example.prac.entity.Book;
import com.example.prac.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImplement implements BookService {
    @Autowired
    private BookDao bookDao;

    public List<Book> findAll(){
        return bookDao.findAll();
    }

    public Book findBook(Integer bookId){
        return bookDao.findOne(bookId);
    }
}
