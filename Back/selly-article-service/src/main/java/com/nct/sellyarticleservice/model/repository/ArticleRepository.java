package com.nct.sellyarticleservice.model.repository;

import com.nct.sellyarticleservice.domain.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Long> {
  Long countBy();

  List<Article> findByCategory(String category);
}
