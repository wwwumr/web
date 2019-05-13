package com.example.prac.controller;

import com.example.prac.dao.DetailDao;
import com.example.prac.entity.Detail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/detail")
public class DetailController {
    @Autowired
    private DetailDao detailDao;

    @GetMapping(value = "/id")
    public List<Detail> say(){
        return detailDao.findAll();
    }

    @GetMapping(value = "/{id}")
    public Detail say(@PathVariable Integer id){
        return detailDao.findOne(id);
    }
}
