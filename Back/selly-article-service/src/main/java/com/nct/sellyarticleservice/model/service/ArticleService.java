package com.nct.sellyarticleservice.model.service;

import com.nct.sellyarticleservice.domain.dto.*;
import com.nct.sellyarticleservice.domain.entity.Article;

import java.util.List;

public interface ArticleService {

  ResponseArticle createArticle(RequestArticleCreate requestArticleCreate);

  List<ResponseArticle> findByAll();

   // ArticleResponseDto findById(Long articleId, Long userId);
   ResponseArticle findById(Long articleId);
   ResponseArticleId findByArticleId(String contractAddress, String tokenId);
//  ArticleResponse findById(Long articleId);

   Long numberOfArticle();

   List<Article> articleCategoryFilter(String category, boolean avaiability);

  ArticleResponse updateArticle(ArticleUpdateRequest articleUpdateRequest, Long id);

  List<ResponseArticle> findBySell(String sell);

  List<ResponseArticle> findByAuction(String auction);

  List<ArticleResponse> findByKeyword(String keyword);

  ResponseArticle createArticleNoMinting(RequestArticleCreate requestArticleCreate);
}
