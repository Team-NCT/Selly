package com.nct.sellyarticleservice.model.service;
import com.nct.sellyarticleservice.client.UserServiceClient;
import com.nct.sellyarticleservice.domain.dto.ArticleRequest;
import com.nct.sellyarticleservice.domain.dto.ArticleResponse;
//import com.nct.sellyarticleservice.domain.dto.ArticleResponseDto;
import com.nct.sellyarticleservice.domain.dto.ArticleUpdateRequest;
import com.nct.sellyarticleservice.client.SellyContractServiceClient;
import com.nct.sellyarticleservice.domain.dto.*;
import com.nct.sellyarticleservice.domain.entity.Article;
import com.nct.sellyarticleservice.model.repository.ArticleRepository;
import com.nct.sellyarticleservice.vo.ResponseUser;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ArticleServiceImpl implements ArticleService{

  private final ArticleRepository articleRepository;
  private final UserServiceClient userServiceClient;
  private final SellyContractServiceClient sellyContractServiceClient;
  private ModelMapper mapper = new ModelMapper();

  @Transactional
  @Override
  public ResponseArticle createArticle(RequestArticleCreate requestArticleCreate) {
    requestArticleCreate.setMetaDataUrl("https://skywalker.infura-ipfs.io/ipfs/"+requestArticleCreate.getMetaDataUrl());
    requestArticleCreate.setArticleImgUrl("https://skywalker.infura-ipfs.io/ipfs/" + requestArticleCreate.getArticleImgUrl());
    mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
    Article article = mapper.map(requestArticleCreate, Article.class);
    ResponseListen responseListen = sellyContractServiceClient.getListen(requestArticleCreate.getWallet());
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

//  @Override
//<<<<<<< HEAD
//  public ArticleResponseDto findById (Long articleId, Long userId) {
//    ArticleResponseDto articleResponseDto = new ArticleResponseDto();
//    Optional<Article> optionalArticle = articleRepository.findById(articleId);
//    if (optionalArticle.isPresent()) {
//      Article article = optionalArticle.get();
//      ResponseUser responseUser = userServiceClient.getUser(article.getOwner());
//      return ArticleResponseDto.builder()
//              .owner(article.getOwner())
//              .ownerImg(responseUser.getImage())
//              .ownerNickname(responseUser.getNickname())
//              .certification(responseUser.isCertification())
//              .articleImgUrl(article.getArticleImgUrl())
//              .contractAddress(article.getContractAddress())
//              .tokenId(article.getTokenId())
//              .metaDataUrl(article.getMetaDataUrl())
////            .bookMark()
//              .build();
//    }
//    return articleResponseDto;
//    Article entity = articleRepository.findById(articleId)
//            .orElseThrow(() -> new IllegalArgumentException("해당 작품이 없습니다. id=" + articleId));
//    ResponseUser responseUser = userServiceClient.getUser(entity.getOwner());
//    if (entity.isAvailability()) {
//      return ArticleResponseDto.builder()
//              .owner(entity.getOwner())
//              .ownerImg(responseUser.getImage())
//              .ownerNickname(responseUser.getNickname())
//              .certification(responseUser.isCertification())
//              .articleImgUrl(entity.getArticleImgUrl())
//              .contractAddress(entity.getContractAddress())
//              .tokenId(entity.getTokenId())
//              .metaDataUrl(entity.getMetaDataUrl())
//              .build();
//    }
//    return ArticleResponseDto.builder()
//            .articleId(entity.getArticleId())
//            .articleName(entity.getArticleName())
//            .articleImgUrl(entity.getArticleImgUrl())
//            .metaDataUrl(entity.getMetaDataUrl())
//            .articleIntroduction(entity.getArticleIntroduction())
//            .originalAuthor(entity.getOriginalAuthor())
//            .build();
//    return ArticleResponseDto.builder()
//            .owner(entity.getOwner())
//            .ownerImg(responseUser.getImage())
//            .ownerNickname(responseUser.getNickname())
//            .certification(responseUser.isCertification())
//            .articleImgUrl(entity.getArticleImgUrl())
//            .contractAddress(entity.getContractAddress())
//            .tokenId(entity.getTokenId())
//            .metaDataUrl(entity.getMetaDataUrl())
////            .bookMark()
//            .build();
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
  public List<ArticleResponse> articleCategoryFilter(String category, boolean availability, String sort, String order) {
//    List<Article> articleList = articleRepository.findAllByCategoryAndAvailability(category, availability, Sort.by(Sort.Direction.ASC, "createRegist"));
//    ListarticleList(Sort.by(Sort.Direction.ASC, "createRegist"))
//    return articleRepository.findAllByCategoryAndAvailability(category, availability);
//    return articleList;
    List<Article> articleList = new ArrayList<>();
    List<ArticleResponse> articleResponseList = new ArrayList<>();
    if (Objects.equals(sort, "asc")) {
      switch (order) {
        case "sellRegist":
          articleList = articleRepository.findAllByCategoryAndAvailability(category, availability, Sort.by(Sort.Direction.ASC, "createRegist"));
          break;
        case "trade":
          articleList = articleRepository.findAllByCategoryAndAvailability(category, availability, Sort.by(Sort.Direction.ASC));
          break;
        case "price":
          articleList = articleRepository.findAllByCategoryAndAvailability(category, availability, Sort.by(Sort.Direction.ASC, "price"));
          break;
        default:
          articleList = articleRepository.findAllByAvailability(availability, Sort.by(Sort.Direction.ASC, "price"));

      }
    } else {
      switch (order) {
        case "sellRegist":
          articleList = articleRepository.findAllByCategoryAndAvailability(category, availability, Sort.by(Sort.Direction.DESC, "createRegist"));
          break;
        case "trade":
          articleList = articleRepository.findAllByCategoryAndAvailability(category, availability, Sort.by(Sort.Direction.DESC));
          break;
        case "price":
          articleList = articleRepository.findAllByCategoryAndAvailability(category, availability, Sort.by(Sort.Direction.DESC, "price"));
          break;
      }
      articleList.forEach(v-> {
//        articleResponseList.add(mapper.map(v, ArticleResponse.class));
        ArticleResponse articleResponse = ArticleResponse.builder()
                .articleId(v.getArticleId())
                .articleName(v.getArticleName())
                .articleImgUrl(v.getArticleImgUrl())
                .recentMarketPrice(v.getRecentMarketPrice())
                .build();
        articleResponseList.add(articleResponse);
      });
    }
    return articleResponseList;
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
