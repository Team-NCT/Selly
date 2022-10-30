package com.nct.sellyarticleservice.model.service;

import com.nct.sellyarticleservice.domain.dto.ArticleRequest;
import com.nct.sellyarticleservice.domain.dto.ArticleResponse;
import com.nct.sellyarticleservice.domain.dto.ArticleResponseDto;
import com.nct.sellyarticleservice.domain.entity.Article;

import java.util.List;

public interface ArticleService {

  public Long createArticle(ArticleRequest articleRequest);

  public List<Article> findByAll();

  public ArticleResponseDto findById(Long id);

  public Long numberOfArticle();

  public List<Article> articleCategoryFilter(String category);
}
