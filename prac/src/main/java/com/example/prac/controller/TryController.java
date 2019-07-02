package com.example.prac.controller;

import org.springframework.web.bind.annotation.*;

import com.example.prac.entity.Book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;


@RestController
public class TryController {

    @Autowired
    MongoTemplate mongotemplate;

    @PostMapping("/upload1")
    public Book get(){
        Query query = new Query();
        query.addCriteria(Criteria.where("book_id").gt(2));
        Book book = mongotemplate.findOne(query, Book.class);
        System.out.println(book);
        return book;
    }
    @PostMapping("/upload")
    @ResponseBody
    public String upload(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return "上传失败，请选择文件";
        }

        String fileName = file.getOriginalFilename();
        String filePath = "D:/program/web/e-book-react/public/img/";
        File dest = new File(filePath + fileName);
        try {
            file.transferTo(dest);
            return "上传成功";
        } catch (IOException e) {
        }
        return "上传失败！";
    }

}