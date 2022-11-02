package com.nct.sellyarticleservice.model.repository;

import com.nct.sellyarticleservice.domain.entity.Article;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Long> {
  Long countBy();

  List<Article> findAllByCategoryAndAvailability(String category, boolean availability);

  List<Article> findAllByAvailability(boolean availability, Sort sort);

  List<Article> findAllByStatus(boolean status);

  List<Article> findAllByAuction(boolean status);

  List<Article> findAllByArticleNameContaining(String articleName);

//  List<Article> findAllByCreateRegistDesc();
}
