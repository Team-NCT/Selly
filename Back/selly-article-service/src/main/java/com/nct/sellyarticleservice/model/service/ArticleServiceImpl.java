package com.nct.sellyarticleservice.model.service;

import com.nct.sellyarticleservice.domain.dto.ArticleRequest;
import com.nct.sellyarticleservice.domain.dto.ArticleResponse;
import com.nct.sellyarticleservice.domain.dto.ArticleResponseDto;
import com.nct.sellyarticleservice.domain.dto.ArticleUpdateRequest;
import com.nct.sellyarticleservice.domain.entity.Article;
import com.nct.sellyarticleservice.model.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.bouncycastle.math.raw.Mod;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class ArticleServiceImpl implements ArticleService{

  private final ArticleRepository articleRepository;

  @Transactional
  @Override
  public Long createArticle(ArticleRequest articleRequest) {
    return articleRepository.save(articleRequest.toEntity()).getArticleId();
  }

  @Override
  public List<ArticleResponseDto> findByAll() {
    List<Article> articleList = articleRepository.findAll();
    List<ArticleResponseDto> articleResponseDtoList = new ArrayList<>();
    articleList.forEach(v -> {
        articleResponseDtoList.add(new ModelMapper().map(v, ArticleResponseDto.class));
      }
    );
    return articleResponseDtoList;
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
  public List<Article> articleCategoryFilter(String category, boolean availability) {

    return articleRepository.findAllByCategoryAndAvailability(category, availability);
  }

  @Override
  public ArticleResponse updateArticle(ArticleUpdateRequest articleUpdateRequest, Long id) {
    Article article = articleRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("해당 작품이 없습니다. id=" + id));
    article.updateArticle(
            articleUpdateRequest.isAvailability(),
            LocalDateTime.now()
    );
    articleRepository.save(article);

    return ArticleResponse.builder()
            .registTime(articleUpdateRequest.getRegistTime())
            .availability(articleUpdateRequest.isAvailability())
            .build();
  }

  @Override
  public List<ArticleResponseDto> findBySell(String sell) {
    boolean status;
    List<ArticleResponseDto> articleResponseDtoList = new ArrayList<>();
    if (Objects.equals(sell, "selling")) {
      status = true;
    } else if (Objects.equals(sell, "end")) {
      status = false;
    } else {
      List<Article> articleList = articleRepository.findAll();
      articleList.forEach(v -> {
                articleResponseDtoList.add(new ModelMapper().map(v, ArticleResponseDto.class));
              });
              return articleResponseDtoList;
    }
    List<Article> articleList = articleRepository.findAllByStatus(status);
    articleList.forEach(v -> {
      articleResponseDtoList.add(new ModelMapper().map(v, ArticleResponseDto.class));
    });
    return articleResponseDtoList;
  }

  @Override
  public List<ArticleResponseDto> findByAuction(String auction) {
    boolean status;
    List<ArticleResponseDto> articleResponseDtoList = new ArrayList<>();
    if (Objects.equals(auction, "selling")) {
      status = true;
    } else if (Objects.equals(auction, "end")) {
      status = false;
    } else {
      List<Article> articleList = articleRepository.findAll();
      articleList.forEach(v -> {
        articleResponseDtoList.add(new ModelMapper().map(v, ArticleResponseDto.class));
      });
      return articleResponseDtoList;
    }
    List<Article> articleList = articleRepository.findAllByAuction(status);
    articleList.forEach(v -> {
      articleResponseDtoList.add(new ModelMapper().map(v, ArticleResponseDto.class));
    });
    return articleResponseDtoList;
  }

  @Override
  public List<ArticleResponse> findByKeyword(String keyword) {
    List<ArticleResponse> articleResponseList = new ArrayList<>();
    List<Article> articleList = articleRepository.findAllByArticleNameContaining(keyword);
    articleList.forEach( v -> {
      articleResponseList.add(new ModelMapper().map(v, ArticleResponse.class));
    });
    return articleResponseList;
  }
}
