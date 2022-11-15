package com.b102.sellyuserservice.model.repository;

import com.b102.sellyuserservice.domain.entity.BookMark;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookMarkRepository extends JpaRepository<BookMark, Long> {
  BookMark findByUserIdAndArticleId(Long userId, Long articleId);
  List<BookMark> findByUserId(Long userId);
}
