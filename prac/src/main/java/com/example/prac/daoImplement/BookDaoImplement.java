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
    private BookRepo detailRepo;

    @Override
    public List<Book> findAll() {
        return detailRepo.findAll();
    }

    @Override
    public Book findOne(Integer id){
        return detailRepo.getOne(id);
    }

}
