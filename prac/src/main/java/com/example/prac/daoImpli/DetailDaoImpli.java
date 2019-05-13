package com.example.prac.daoImpli;

import com.example.prac.repository.DetailRepo;
import com.example.prac.dao.DetailDao;
import com.example.prac.entity.Detail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DetailDaoImpli implements DetailDao {
    @Autowired
    private DetailRepo detailRepo;

    @Override
    public List<Detail> findAll() {
        return detailRepo.findAll();
    }

    @Override
    public Detail findOne(Integer id){
        return detailRepo.getOne(id);
    }

    @Override
    public void ReduceOne(Integer id,Integer num) {
        Detail detail = findOne(id);
        Integer after = detail.getRemaining() - num;
        if(after >= 0)
            detail.setRemaining(after);
        detailRepo.save(detail);
    }
}
