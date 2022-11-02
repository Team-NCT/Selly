package com.nct.sellyarticleservice.model.service;

import com.nct.sellyarticleservice.domain.dto.ArticleRequest;
import com.nct.sellyarticleservice.domain.dto.ArticleResponse;
import com.nct.sellyarticleservice.domain.dto.ArticleResponseDto;
import com.nct.sellyarticleservice.domain.dto.ArticleUpdateRequest;
import com.nct.sellyarticleservice.domain.entity.Article;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ArticleService {

   Long createArticle(ArticleRequest articleRequest);

   List<ArticleResponseDto> findByAll();

   ArticleResponseDto findById(Long id);

   Long numberOfArticle();

   List<Article> articleCategoryFilter(String category, boolean avaiability);

  ArticleResponse updateArticle(ArticleUpdateRequest articleUpdateRequest, Long id);

  List<ArticleResponseDto> findBySell(String sell);

  List<ArticleResponseDto> findByAuction(String auction);

  List<ArticleResponse> findByKeyword(String keyword);
}
