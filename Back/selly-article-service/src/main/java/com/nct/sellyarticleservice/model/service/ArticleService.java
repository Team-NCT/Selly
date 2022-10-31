package com.nct.sellyarticleservice.model.service;

import com.nct.sellyarticleservice.domain.dto.ArticleRequest;
import com.nct.sellyarticleservice.domain.dto.ArticleResponse;
import com.nct.sellyarticleservice.domain.dto.ArticleResponseDto;
import com.nct.sellyarticleservice.domain.dto.ArticleUpdateRequest;
import com.nct.sellyarticleservice.domain.entity.Article;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ArticleService {

  public Long createArticle(ArticleRequest articleRequest);

  public List<Article> findByAll();

  public ArticleResponseDto findById(Long id);

  public Long numberOfArticle();

  public List<Article> articleCategoryFilter(String category, boolean avaiability);

  ArticleResponse updateArticle(ArticleUpdateRequest articleUpdateRequest, Long id);
}
