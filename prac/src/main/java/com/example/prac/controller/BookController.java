package com.example.prac.controller;

import com.example.prac.entity.Book;
import com.example.prac.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/book")
public class BookController {
    @Autowired
    private BookService bookService;

    @GetMapping(value = "/id")
    public List<Book> say(){
        return bookService.findAll();
    }

    @GetMapping(value = "/{id}")
    public Book say(@PathVariable Integer id){
        return bookService.findBook(id);
    }

}
