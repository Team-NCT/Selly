package com.nct.sellyarticleservice.model.service;

import com.nct.sellyarticleservice.domain.dto.ArticleRequest;
import com.nct.sellyarticleservice.domain.entity.Article;
import com.nct.sellyarticleservice.model.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.aspectj.bridge.Message;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
@RequiredArgsConstructor
@Service
public class ArticleService {

  private final ArticleRepository articleRepository;
  public Message createArticle(ArticleRequest articleRequest) throws SQLException {
    Article article = Article.builder()
            .articleImgUrl(articleRequest.getArticleImgUrl())
            .articleIntroduction(articleRequest.getArticleIntroduction())
            .articleName(articleRequest.getArticleName())
            .availability(articleRequest.isAvailability())
            .category(articleRequest.getCategory())
            .connectionLink(articleRequest.getConnectionLink())
            .attribute(articleRequest.getAttribute())
            .metaDataUrl(articleRequest.getMetaDataUrl())
            .hashData(articleRequest.getHashData())
            .originalAuthor(articleRequest.getOriginalAuthor())
            .price(articleRequest.getPrice())
            .primaryCnt(articleRequest.getPrimaryCnt())
            .currentCnt(articleRequest.getCurrentCnt())
            .owner(articleRequest.getOwner())
            .build();
    articleRepository.save(article);
    return
  }
}
