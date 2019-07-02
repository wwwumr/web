package com.example.prac.daoImplement;

import com.example.prac.repository.BookRepo;
import com.example.prac.dao.BookDao;
import com.example.prac.entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BookDaoImplement implements BookDao {
    @Autowired
    private BookRepo bookRepo;

    @Override
    public List<Book> findAll() {
        return bookRepo.findAll();
    }

    @Override
    public Book findOne(Integer id){
        return bookRepo.getOne(id);
    }

    public void putOne(Book book){
        bookRepo.save(book);
    }

    @Override
    public Integer getKey() {
        return bookRepo.getKey();
    }

    @Override
    public void removeBook(Integer id) {
        bookRepo.deleteBookByBookId(id);
    }
}
