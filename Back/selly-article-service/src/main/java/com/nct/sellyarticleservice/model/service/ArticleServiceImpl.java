package com.nct.sellyarticleservice.model.service;

import com.nct.sellyarticleservice.client.SellyContractServiceClient;
import com.nct.sellyarticleservice.domain.dto.*;
import com.nct.sellyarticleservice.domain.entity.Article;
import com.nct.sellyarticleservice.model.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
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
  private final SellyContractServiceClient sellyContractServiceClient;
  private ModelMapper mapper = new ModelMapper();

  @Transactional
  @Override
  public ResponseArticle createArticle(RequestArticleCreate requestArticleCreate) {
    System.out.println("일단 여기까지 들어옴");
    requestArticleCreate.setMetaDataUrl("https://skywalker.infura-ipfs.io/ipfs/"+requestArticleCreate.getMetaDataUrl());
    requestArticleCreate.setArticleImgUrl("https://skywalker.infura-ipfs.io/ipfs/" + requestArticleCreate.getArticleImgUrl());
    mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
    Article article = mapper.map(requestArticleCreate, Article.class);
    ResponseListen responseListen = sellyContractServiceClient.getListen(requestArticleCreate.getWallet());
    System.out.println(responseListen);
    article.setContractAddress(responseListen.getContractAddress());
    article.setTokenId(responseListen.getToken());
    articleRepository.save(article);
    return mapper.map(article, ResponseArticle.class);
  }

  @Override
  public List<ResponseArticle> findByAll() {
    List<Article> articleList = articleRepository.findAll();
    List<ResponseArticle> responseArticleList = new ArrayList<>();
    articleList.forEach(v -> {
        responseArticleList.add(new ModelMapper().map(v, ResponseArticle.class));
      }
    );
    return responseArticleList;
  }

  @Override
  public ResponseArticle findById (Long articleId) {
    Article entity = articleRepository.findById(articleId)
            .orElseThrow(() -> new IllegalArgumentException("해당 작품이 없습니다. id=" + articleId));
    if (entity.isAvailability()) {
      return ResponseArticle.builder()
              .articleId(entity.getArticleId())
              .articleName(entity.getArticleName())
              .articleImgUrl(entity.getArticleImgUrl())
              .metaDataUrl(entity.getMetaDataUrl())
              .availability(entity.isAvailability())
              .tokenId(entity.getTokenId())
              .contractAddress(entity.getContractAddress())
              .build();
    }
    return ResponseArticle.builder()
            .articleId(entity.getArticleId())
            .articleName(entity.getArticleName())
            .articleImgUrl(entity.getArticleImgUrl())
            .metaDataUrl(entity.getMetaDataUrl())
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
  public List<ResponseArticle> findBySell(String sell) {
    boolean status;
    List<ResponseArticle> responseArticleList = new ArrayList<>();
    if (Objects.equals(sell, "selling")) {
      status = true;
    } else if (Objects.equals(sell, "end")) {
      status = false;
    } else {
      List<Article> articleList = articleRepository.findAll();
      articleList.forEach(v -> {
                responseArticleList.add(new ModelMapper().map(v, ResponseArticle.class));
              });
              return responseArticleList;
    }
    List<Article> articleList = articleRepository.findAllByStatus(status);
    articleList.forEach(v -> {
      responseArticleList.add(new ModelMapper().map(v, ResponseArticle.class));
    });
    return responseArticleList;
  }

  @Override
  public List<ResponseArticle> findByAuction(String auction) {
    boolean status;
    List<ResponseArticle> responseArticleList = new ArrayList<>();
    if (Objects.equals(auction, "selling")) {
      status = true;
    } else if (Objects.equals(auction, "end")) {
      status = false;
    } else {
      List<Article> articleList = articleRepository.findAll();
      articleList.forEach(v -> {
        responseArticleList.add(new ModelMapper().map(v, ResponseArticle.class));
      });
      return responseArticleList;
    }
    List<Article> articleList = articleRepository.findAllByAuction(status);
    articleList.forEach(v -> {
      responseArticleList.add(new ModelMapper().map(v, ResponseArticle.class));
    });
    return responseArticleList;
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
