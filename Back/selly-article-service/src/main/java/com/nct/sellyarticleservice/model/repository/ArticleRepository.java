package com.nct.sellyarticleservice.model.repository;

import com.nct.sellyarticleservice.domain.entity.Article;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Long> {
  Long countBy();

  List<Article> findByCategoryAndAvailability(String category, boolean availability);

  List<Article> findByAvailability(boolean availability, Sort sort);

  List<Article> findByStatus(boolean status);

  List<Article> findByAuction(boolean status);

//  List<Article> findAllByCreateRegistDesc();
}
