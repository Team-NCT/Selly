package com.nct.sellyarticleservice.model.service;

import com.nct.sellyarticleservice.domain.dto.*;
import com.nct.sellyarticleservice.domain.entity.Article;
import com.nct.sellyarticleservice.vo.ArticleRankingResponse;
import com.nct.sellyarticleservice.vo.CategoryResponse;

import java.util.HashMap;
import java.util.List;

public interface ArticleService {

  ResponseArticle createArticle(RequestArticleCreate requestArticleCreate);

  List<ResponseArticle> findByAll();
  List<ArticleRankingResponse> rankingTop10();

   // ArticleResponseDto findById(Long articleId, Long userId);
   ResponseArticle findById(Long articleId);
   ResponseArticleId findByArticleId(String contractAddress, String tokenId);
//  ArticleResponse findById(Long articleId);

   Long numberOfArticle();

   List<CategoryResponse> articleCategoryFilter(String category, boolean avaiability, String sort, String order);

  ArticleResponse updateArticle(ArticleUpdateRequest articleUpdateRequest, Long id);

  List<ResponseArticle> findBySell(String sell);

  List<ResponseArticle> findByAuction(String auction);

  List<ArticleResponse> findByKeyword(String keyword);

  List<ArticleResponse> findByOriginalAuthor(Long userId);

  HashMap<String, Object> findByArticleAndUser(Long articleId);
  
  ResponseArticle createArticleNoMinting(RequestNoMinting requestNoMinting);
}
