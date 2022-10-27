package com.nct.sellyarticleservice.model.repository;

import com.nct.sellyarticleservice.domain.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {
}
