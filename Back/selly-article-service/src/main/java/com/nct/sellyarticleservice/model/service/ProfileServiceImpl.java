package com.nct.sellyarticleservice.model.service;

import com.nct.sellyarticleservice.client.TradeServiceClient;
import com.nct.sellyarticleservice.domain.dto.ArticleResponse;
import com.nct.sellyarticleservice.domain.dto.ResponseArticleId;
import com.nct.sellyarticleservice.domain.entity.Article;
import com.nct.sellyarticleservice.model.repository.ArticleRepository;
import com.nct.sellyarticleservice.vo.TradeRegistDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService{
  private final TradeServiceClient tradeServiceClient;
  private final ArticleRepository articleRepository;
  @Override
  public List<ArticleResponse> findUserSaleArticleList(Long userId) {
    List<ArticleResponse> articleResponses = new ArrayList<>();
    List<Long> articleId = tradeServiceClient.searchResult(userId);
    if (articleId == null){
      return null;
    }
    List<ArticleResponse> returnValue = new ArrayList<>();
    articleId.forEach(v->{
      Article article = articleRepository.findByArticleId(v);
      ArticleResponse articleResponse = ArticleResponse.builder()
              .articleName(article.getArticleName())
              .articleImgUrl(article.getArticleImgUrl())
              .articleId(article.getArticleId())
              .build();
      returnValue.add(articleResponse);
    });
    return returnValue;
  }
}
