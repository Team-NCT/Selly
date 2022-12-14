package com.nct.sellyarticleservice.controller;


import com.nct.sellyarticleservice.domain.dto.*;
import com.nct.sellyarticleservice.domain.entity.Article;
import com.nct.sellyarticleservice.model.repository.ArticleRepository;
import com.nct.sellyarticleservice.model.service.ArticleServiceImpl;
import com.nct.sellyarticleservice.model.service.ProfileService;
import com.nct.sellyarticleservice.vo.ArticleRankingResponse;
import com.nct.sellyarticleservice.vo.CategoryResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.*;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/selly-article-service")
@Slf4j
public class ArticleController {

  private final ArticleServiceImpl articleService;

  private final ArticleRepository articleRepository;

  private final ProfileService profileService;



  @GetMapping("/{articleId}")
  public ResponseArticle findById (@PathVariable("articleId") Long articleId) {
    return articleService.findById(articleId);
  }

  @GetMapping("/nft/{articleId}")
  public HashMap<String, Object> nftSearch (@PathVariable("articleId") Long articleId){
    HashMap<String, Object> result = articleService.findByArticleAndUser(articleId);
    return result;
  }

  @PostMapping("/create")
  public ResponseArticle createArticle(@RequestBody RequestArticleCreate requestArticleCreate) throws SQLException {
    return articleService.createArticle(requestArticleCreate);
  }

  @PostMapping("/create/nominting")
  public ResponseArticle createArticleNoMinting(@RequestBody RequestNoMinting requestNoMinting) throws SQLException{
    return articleService.createArticleNoMinting(requestNoMinting);
  }

  @GetMapping("")
  public List<ResponseArticle> getArticleByAll() {
    return articleService.findByAll();
  }


  @GetMapping("/number-of-article")
  public Long numberOfArticle() {
    return articleService.numberOfArticle();
  }

  // ???????????? ??????
  @GetMapping("/category-filter/{category}/{sort}/{order}")
  public List<CategoryResponse> articleCategoryFilter(@PathVariable("category") String category, @PathVariable("sort") String sort, @PathVariable("order") String order) {
    boolean availability = true;
    return articleService.articleCategoryFilter(category, availability, sort, order);
  }

  // ?????? ??????
  @GetMapping("/sort")
  public List<Article> articleSort(@RequestParam("sort") String sort, @RequestParam("order") String order) {
    List<Article> articleList = new ArrayList<>();
    if (Objects.equals(sort, "asc")) {
      switch (order) {
        case "sellRegist":
          articleList = articleRepository.findAll(Sort.by(Sort.Direction.ASC, "createRegist"));
          break;
        case "trade":
          articleList = articleRepository.findAll(Sort.by(Sort.Direction.ASC));
          break;
        case "price":
          articleList = articleRepository.findAll(Sort.by(Sort.Direction.ASC, "price"));
          break;
      }
    } else {
      switch (order) {
        case "sellRegist":
          articleList = articleRepository.findAll(Sort.by(Sort.Direction.DESC, "createRegist"));
          break;
        case "trade":
          articleList = articleRepository.findAll(Sort.by(Sort.Direction.DESC));
          break;
        case "price":
          articleList = articleRepository.findAll(Sort.by(Sort.Direction.DESC, "price"));
          break;
      }
    }
    return articleList;
  }

  // ?????? ?????? call
  @PostMapping("/{articleId}")
  public ResponseEntity<String> response(@RequestBody ArticleUpdateRequest articleUpdateRequest, @PathVariable("articleId") Long articleId) {
    ArticleResponse articleResponse = articleService.updateArticle(articleUpdateRequest, articleId);
    String response = "success";
    return ResponseEntity.ok()
            .body(response);
  }

  @GetMapping("/sell-filter")
  public List<ResponseArticle> getArticleBySellStatus(@PathVariable("sell") String sell) {
    return articleService.findBySell(sell);
  }

  @GetMapping("/auction-filter")
  public List<ResponseArticle> getArticleByAuctionStatus(@PathVariable("auction") String auction) {
    return articleService.findByAuction(auction);
  }

  // ?????? ??????
  @GetMapping("/search/{keyword}")
  public List<ArticleResponse> articleSearch(@PathVariable("keyword") String keyword) {
    return articleService.findByKeyword(keyword);
  }
  @GetMapping("/searchId/{contractAddress}/{tokenId}")
  public ResponseArticleId articleIdSearch(@PathVariable("contractAddress") String contractAddress, @PathVariable("tokenId") String tokenId){
    if (articleService.findByArticleId(contractAddress, tokenId) == null){
      return null;
    }
    return articleService.findByArticleId(contractAddress, tokenId);
  }


  // ?????? ??????
  @GetMapping("/AuthorSearch/{userId}")
  public List<ArticleResponse> findByOriginalAuthor(@PathVariable("userId") Long userId) {
    return articleService.findByOriginalAuthor(userId);
  }

  //?????? ??????
  @GetMapping("/articleRanking")
  public ResponseEntity<List<ArticleRankingResponse>> articleRanking() {
    List<ArticleRankingResponse> rankingResponseList = articleService.rankingTop10();

    if(rankingResponseList != null){
      return ResponseEntity.status(HttpStatus.OK).body(rankingResponseList);

    } else{
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
  }

  @GetMapping("/articleCount/{userId}")
  public Integer articleCount(@PathVariable("userId") Long userId){
    return articleRepository.countByOwner(userId);
  }

  @GetMapping("/user-forSale/{userId}")
  public ResponseEntity<List<ArticleResponse>> userSaleArticleList(@PathVariable("userId") Long userId) {
    List<ArticleResponse> responses = profileService.findUserSaleArticleList(userId);
    if (responses != null){
      return ResponseEntity.status(HttpStatus.OK).body(responses);
    }else{
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
  }

  // ?????? ???????????? ????????????
  @PutMapping("/article-availability")
  public void articleAvailability(@RequestBody ResponseArticleUpdate responseArticleUpdate) {
    Article article = articleRepository.findByArticleId(responseArticleUpdate.getArticleId());
    article.setAvailability(responseArticleUpdate.isAvailability());
    article.setRecentMarketPrice(responseArticleUpdate.getRecentMarketPrice());
    articleRepository.save(article);

  }
  @GetMapping("/findByArticleList")
  public List<ArticleResponse> findByArticleList(@RequestParam("List") List<Long> articleIdList) {
    List<ArticleResponse> articleResponseList = new ArrayList<>();
    for (Long i : articleIdList) {
      Article article = articleRepository.findByArticleId(i);
      articleResponseList.add(new ModelMapper().map(article, ArticleResponse.class));
    }
    return articleResponseList;
  }

  @GetMapping("/profile/{articleId}")
  public ArticleResponse findByIdForProfile (@PathVariable("articleId") Long articleId) {
    return articleService.findByIdForProfile(articleId);
  }
}

