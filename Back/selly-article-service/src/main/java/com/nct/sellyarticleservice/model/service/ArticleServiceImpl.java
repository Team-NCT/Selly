package com.nct.sellyarticleservice.model.service;

import com.nct.sellyarticleservice.domain.dto.ArticleRequest;
import com.nct.sellyarticleservice.domain.dto.ArticleResponse;
import com.nct.sellyarticleservice.domain.dto.ArticleResponseDto;
import com.nct.sellyarticleservice.domain.entity.Article;
import com.nct.sellyarticleservice.model.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ArticleServiceImpl implements ArticleService{

  private final ArticleRepository articleRepository;
//  public Message createArticle(ArticleRequest articleRequest) throws SQLException {
//    Article article = Article.builder()
//            .articleImgUrl(articleRequest.getArticleImgUrl())
//            .articleIntroduction(articleRequest.getArticleIntroduction())
//            .articleName(articleRequest.getArticleName())
//            .availability(articleRequest.isAvailability())
//            .category(articleRequest.getCategory())
//            .connectionLink(articleRequest.getConnectionLink())
//            .attribute(articleRequest.getAttribute())
//            .metaDataUrl(articleRequest.getMetaDataUrl())
//            .hashData(articleRequest.getHashData())
//            .originalAuthor(articleRequest.getOriginalAuthor())
//            .price(articleRequest.getPrice())
//            .primaryCnt(articleRequest.getPrimaryCnt())
//            .currentCnt(articleRequest.getCurrentCnt())
//            .owner(articleRequest.getOwner())
//            .build();
//    articleRepository.save(article);
//    return new Message("등록 성공");
//  }
  @Transactional
  @Override
  public Long createArticle(ArticleRequest articleRequest) {
    return articleRepository.save(articleRequest.toEntity()).getArticleId();
  }

  @Override
  public ArticleResponseDto findById (Long id) {
    Article entity = articleRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("해당 작품이 없습니다. id=" + id));
    if (entity.isAvailability()) {
      return ArticleResponseDto.builder()
              .articleId(entity.getArticleId())
              .articleName(entity.getArticleName())
              .articleImgUrl(entity.getArticleImgUrl())
              .metaDataUrl(entity.getMetaDataUrl())
              .availability(entity.isAvailability())
              .articleIntroduction(entity.getArticleIntroduction())
              .originalAuthor(entity.getOriginalAuthor())
              .tokenId(entity.getTokenId())
              .contractAddress(entity.getContractAddress())
              .build();
    }
    return ArticleResponseDto.builder()
            .articleId(entity.getArticleId())
            .articleName(entity.getArticleName())
            .articleImgUrl(entity.getArticleImgUrl())
            .metaDataUrl(entity.getMetaDataUrl())
            .articleIntroduction(entity.getArticleIntroduction())
            .originalAuthor(entity.getOriginalAuthor())
            .build();
  }

  @Override
  public Long numberOfArticle() {
    return articleRepository.countBy();
  }

  @Override
  public List<Article> articleCategoryFilter(String category) {
    List<Article> list = articleRepository.findByCategory(category);

    return list;
  }
}
