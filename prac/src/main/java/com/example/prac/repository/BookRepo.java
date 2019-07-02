package com.example.prac.repository;

import com.example.prac.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface BookRepo extends JpaRepository<Book,Integer> {

    @Query(nativeQuery = true, value = "select max(book_id)+1 from book")
    Integer getKey();

    @Modifying
    @Transactional
    @Query(value = "delete from book where book_id = ?1", nativeQuery = true)
    void deleteBookByBookId(Integer id);
}
