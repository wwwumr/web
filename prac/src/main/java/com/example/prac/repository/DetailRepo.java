package com.example.prac.repository;

import com.example.prac.entity.Detail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DetailRepo extends JpaRepository<Detail,Integer> {
}
