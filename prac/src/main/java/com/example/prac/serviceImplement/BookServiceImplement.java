package com.example.prac.serviceImplement;

import com.example.prac.dao.BookDao;
import com.example.prac.entity.Book;
import com.example.prac.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

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

    public void saveBook(Book data) {
        bookDao.putOne(data);
    }

    public Integer getKey() {
        return bookDao.getKey();
    }

    public void removeBook(List<Integer> ids) {
        for (Integer id: ids) {
            bookDao.removeBook(id);
        }
    }
}
