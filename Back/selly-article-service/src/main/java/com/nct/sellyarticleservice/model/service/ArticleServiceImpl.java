package com.nct.sellyarticleservice.model.service;
import com.nct.sellyarticleservice.client.TradeServiceClient;
import com.nct.sellyarticleservice.client.UserServiceClient;
import com.nct.sellyarticleservice.domain.dto.ArticleResponse;
//import com.nct.sellyarticleservice.domain.dto.ArticleResponseDto;
import com.nct.sellyarticleservice.domain.dto.ArticleUpdateRequest;
import com.nct.sellyarticleservice.client.SellyContractServiceClient;
import com.nct.sellyarticleservice.domain.dto.*;
import com.nct.sellyarticleservice.domain.entity.Article;
import com.nct.sellyarticleservice.model.repository.ArticleRepository;
import com.nct.sellyarticleservice.vo.ArticleRankingResponse;
import com.nct.sellyarticleservice.vo.CategoryResponse;
import com.nct.sellyarticleservice.vo.ResponseUser;
import com.nct.sellyarticleservice.vo.TradeRankDto;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@RequiredArgsConstructor
@Service
public class ArticleServiceImpl implements ArticleService{

  private final ArticleRepository articleRepository;
  private final UserServiceClient userServiceClient;
  private final SellyContractServiceClient sellyContractServiceClient;
  private ModelMapper mapper = new ModelMapper();
  private final TradeServiceClient tradeServiceClient;
  @Transactional
  @Override
  public ResponseArticle createArticle(RequestArticleCreate requestArticleCreate) {
    System.out.println("들어옴");
    System.out.println(requestArticleCreate);
    System.out.println(requestArticleCreate.getWallet());
    requestArticleCreate.setMetaDataUrl("https://skywalker.infura-ipfs.io/ipfs/"+requestArticleCreate.getMetaDataUrl());
    requestArticleCreate.setArticleImgUrl("https://skywalker.infura-ipfs.io/ipfs/" + requestArticleCreate.getArticleImgUrl());
    mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
    Article article = mapper.map(requestArticleCreate, Article.class);
    System.out.println(requestArticleCreate.getMetaDataUrl());
    System.out.println(requestArticleCreate.getArticleImgUrl());
    System.out.println(requestArticleCreate.getWallet());
    ResponseListen responseListen = sellyContractServiceClient.getListen(requestArticleCreate.getWallet());
//    ResponseListen responseListen = sellyContractServiceClient.getListen();
    System.out.println(responseListen);
    System.out.println("리슨 완료 !");
    article.setContractAddress(responseListen.getContractAddress());
    article.setTokenId(responseListen.getTokenId());
    article.setOriginalAuthor(requestArticleCreate.getOwner());
    articleRepository.save(article);
    return mapper.map(article, ResponseArticle.class);
  }

  @Override
  public ResponseArticle createArticleNoMinting(RequestNoMinting requestArticleCreate) {
    System.out.println("민팅 X 들어옴");
    System.out.println(requestArticleCreate);
    System.out.println(requestArticleCreate.getWallet());
    requestArticleCreate.setMetaDataUrl("https://skywalker.infura-ipfs.io/ipfs/"+requestArticleCreate.getMetaDataUrl());
    requestArticleCreate.setArticleImgUrl(requestArticleCreate.getArticleImgUrl());
    mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
    Article article = mapper.map(requestArticleCreate, Article.class);
    articleRepository.save(article);
    System.out.println(requestArticleCreate.getMetaDataUrl());
    System.out.println(requestArticleCreate.getArticleImgUrl());
    System.out.println(requestArticleCreate.getWallet());
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
              .primaryCnt((entity.getPrimaryCnt()))
              .recentMarketPrice(entity.getRecentMarketPrice())
              .build();
    }
    return ResponseArticle.builder()
            .articleId(entity.getArticleId())
            .articleName(entity.getArticleName())
            .articleImgUrl(entity.getArticleImgUrl())
            .primaryCnt(entity.getPrimaryCnt())
            .owner(entity.getOwner())
            .metaDataUrl(entity.getMetaDataUrl())
            .recentMarketPrice(entity.getRecentMarketPrice())
            .build();
  }

  @Override
  public Long numberOfArticle() {
    return articleRepository.countBy();
  }

  @Override
  public List<CategoryResponse> articleCategoryFilter(String category, boolean availability, String sort, String order) {
    List<Article> articleList = new ArrayList<>();
    List<CategoryResponse> articleResponseList = new ArrayList<>();
    if (sort.equals("asc")) {
      if (category.equals("all")) {
        switch (order) {
          case "sellRegist":
            articleList = articleRepository.findByAvailability(availability, Sort.by(Sort.Direction.ASC, "createRegist"));
            break;
          case "price":
            articleList = articleRepository.findByAvailability(availability, Sort.by(Sort.Direction.ASC, "price"));
            break;
        }
        System.out.println(articleList);
        articleList.forEach(v-> {
          System.out.println(v.getArticleId());
          CategoryResponse articleResponse = CategoryResponse.builder()
                  .articleId(v.getArticleId())
                  .articleName(v.getArticleName())
                  .articleImgUrl(v.getArticleImgUrl())
                  .recentMarketPrice(v.getRecentMarketPrice())
                  .rateChange(tradeServiceClient.rateChange(v.getArticleId()))
                  .build();
          articleResponseList.add(articleResponse);
        });
        return articleResponseList;
      }
      switch (order) {
        case "sellRegist":
          articleList = articleRepository.findByCategoryAndAvailability(category, availability, Sort.by(Sort.Direction.ASC, "createRegist"));
          break;
        case "price":
          articleList = articleRepository.findByCategoryAndAvailability(category, availability, Sort.by(Sort.Direction.ASC, "price"));
          break;
      }
      articleList.forEach(v-> {
        CategoryResponse articleResponse = CategoryResponse.builder()
                .articleId(v.getArticleId())
                .articleName(v.getArticleName())
                .articleImgUrl(v.getArticleImgUrl())
                .recentMarketPrice(v.getRecentMarketPrice())
                .rateChange(tradeServiceClient.rateChange(v.getArticleId()))
                .build();
        articleResponseList.add(articleResponse);
      });
    return articleResponseList;
    } else {
      if (category.equals("all")) {
        switch (order) {
          case "sellRegist":
            articleList = articleRepository.findByAvailability(availability, Sort.by(Sort.Direction.DESC, "createRegist"));
            break;
          case "price":
            articleList = articleRepository.findByAvailability(availability, Sort.by(Sort.Direction.DESC, "price"));
            break;
        }      articleList.forEach(v-> {
          CategoryResponse articleResponse = CategoryResponse.builder()
                  .articleId(v.getArticleId())
                  .articleName(v.getArticleName())
                  .articleImgUrl(v.getArticleImgUrl())
                  .recentMarketPrice(v.getRecentMarketPrice())
                  .rateChange(tradeServiceClient.rateChange(v.getArticleId()))
                  .build();
          articleResponseList.add(articleResponse);
        });
        return articleResponseList;
      }
      switch (order) {
        case "sellRegist":
          articleList = articleRepository.findByCategoryAndAvailability(category, availability, Sort.by(Sort.Direction.DESC, "createRegist"));
          break;
        case "price":
          articleList = articleRepository.findByCategoryAndAvailability(category, availability, Sort.by(Sort.Direction.DESC, "price"));
          break;
      }
      articleList.forEach(v-> {
        CategoryResponse articleResponse = CategoryResponse.builder()
                .articleId(v.getArticleId())
                .articleName(v.getArticleName())
                .articleImgUrl(v.getArticleImgUrl())
                .recentMarketPrice(v.getRecentMarketPrice())
                .rateChange(tradeServiceClient.rateChange(v.getArticleId()))
                .build();
        articleResponseList.add(articleResponse);
      });
    }
    return articleResponseList;
  }

  @Override
  public ArticleResponse updateArticle(ArticleUpdateRequest articleUpdateRequest, Long articleId) {
    Article article = articleRepository.findById(articleId)
            .orElseThrow(() -> new IllegalArgumentException("해당 작품이 없습니다. id=" + articleId));
    article.updateArticle(
            articleUpdateRequest.isAvailability(),
            LocalDateTime.now(),
            articleUpdateRequest.getPrice(),
            articleUpdateRequest.getOwnerContractAddress(),
            articleUpdateRequest.getPrimaryCnt(),
            articleUpdateRequest.getCategory()
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

  @Override
  public List<ArticleResponse> findByOriginalAuthor(Long userId) {
    List<Article> articleList = articleRepository.findByOriginalAuthor(userId);
    List<ArticleResponse> articleResponseList = new ArrayList<>();
    articleList.forEach(v -> {
      articleResponseList.add(ArticleResponse.builder()
              .articleId(v.getArticleId())
              .articleName(v.getArticleName())
              .articleImgUrl(v.getArticleImgUrl())
              .build());
    });
    return articleResponseList;
  }
  public ResponseArticleId findByArticleId(String contractAddress, String tokenId) {
    Article responseArticleId = articleRepository.findByContractAddressAndTokenId(contractAddress, tokenId);
    if (responseArticleId == null){
      return null;
    }
    ResponseArticleId articleId = new ResponseArticleId();

    articleId.setArticleId(responseArticleId.getArticleId());
    return articleId;
  }

  @Override
  public HashMap<String, Object> findByArticleAndUser(Long articleId) {
    Article article = articleRepository.findById(articleId)
            .orElseThrow(() -> new IllegalArgumentException("해당 작품이 없습니다. id=" + articleId));
    Long owner = article.getOwner();
    mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
    ResponseInfoArticle responseInfoArticle = mapper.map(article, ResponseInfoArticle.class);
    ResponseUser responseUser = userServiceClient.getUser(owner);
    ResponseInfoUser responseInfoUser = mapper.map(responseUser, ResponseInfoUser.class);
    HashMap<String, Object> result = new HashMap<>();
    result.put("user",responseInfoUser);
    result.put("article", responseInfoArticle);
    return result;
  }

  @Override
  public List<ArticleRankingResponse> rankingTop10() {
    List<TradeRankDto> tradeRankDtos = tradeServiceClient.tradeRanking();
    if (tradeRankDtos == null){
      return null;
    }
    List<ArticleRankingResponse> returnValue = new ArrayList<>();
    tradeRankDtos.forEach(v->{
      Article article = articleRepository.findById(v.getArticleId())
              .orElseThrow(() -> new IllegalArgumentException("해당 작품이 없습니다. id=" + v.getArticleId()));
      ArticleRankingResponse articleRankingResponse = new ArticleRankingResponse();
      articleRankingResponse.setArticleId(article.getArticleId());
      articleRankingResponse.setArticleName(article.getArticleName());
      articleRankingResponse.setArticleImgUrl(article.getArticleImgUrl());
      articleRankingResponse.setPrimaryCnt(article.getPrimaryCnt());
      articleRankingResponse.setPresentSalePieceCnt(v.getPieceCount());
      returnValue.add(articleRankingResponse);
    });
    return returnValue;
  }
}
