package com.nct.sellyarticleservice.controller;

import com.nct.sellyarticleservice.client.TradeServiceClient;
import com.nct.sellyarticleservice.domain.dto.*;
import com.nct.sellyarticleservice.domain.entity.Article;
import com.nct.sellyarticleservice.model.repository.ArticleRepository;
import com.nct.sellyarticleservice.model.service.ArticleServiceImpl;
import com.nct.sellyarticleservice.vo.ArticleRankingResponse;
import com.nct.sellyarticleservice.vo.CategoryResponse;
import com.nct.sellyarticleservice.vo.TradeRankDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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


  //  @GetMapping("/{articleId}")
//  public ArticleResponse findById (@PathVariable("articleId") Long articleId, @RequestParam("userId") Long userId) {
//    return articleService.findById(articleId, userId);
//  }
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
  public ResponseArticle createArticleNoMinting(@RequestBody RequestArticleCreate requestArticleCreate) throws SQLException{
    return articleService.createArticleNoMinting(requestArticleCreate);
  }

  @GetMapping("")
  public List<ResponseArticle> getArticleByAll() {
    return articleService.findByAll();
  }


  @GetMapping("/number-of-article")
  public Long numberOfArticle() {
    return articleService.numberOfArticle();
  }

  // 카테고리 정렬
  @GetMapping("/category-filter/{category}/{sort}/{order}")
  public List<CategoryResponse> articleCategoryFilter(@PathVariable("category") String category, @PathVariable("sort") String sort, @PathVariable("order") String order) {
    boolean availability = true;
    return articleService.articleCategoryFilter(category, availability, sort, order);
  }

  // 정렬 필터
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

  // 필터
//  @GetMapping("/filter")
//  public List<Article> articleFilter(@RequestParam("criterion")String criterion, @RequestParam("order") String order) {
//    List<Article> articleList = new ArrayList<>();
//    if (criterion == "sale") {
//      switch (order) {
//        case "selling":
//          articleList = articleRepository.findByAvailability(true, Sort.by(Sort.Direction.DESC, "createRegist"));
//          break;
//        case "soldout":
//          articleList = articleRepository.findByAvailability(false, Sort.by(Sort.Direction.DESC, "createRegist"));
//          break;
//        case "all":
//          articleList = articleRepository.findAll(Sort.by(Sort.Direction.DESC, "createRegist"));
//          break;
//      }
//      // 소유 조각 목록에서 내 Id로 조회한 뒤 중복되는 articleId 제거후 반환
//    }else {
//      switch (order) {
//        case "selling":
//          articleList = articleRepository.findByAvailability(true, Sort.by(Sort.Direction.DESC, "createRegist"));
//          break;
//        case "soldout":
//          articleList = articleRepository.findByAvailability(false, Sort.by(Sort.Direction.DESC, "createRegist"));
//          break;
//        case "all":
//          articleList = articleRepository.findAll(Sort.by(Sort.Direction.DESC, "createRegist"));
//          break;
//      }
//    }
//    return articleList;
//  }

  // 판매 등록 call
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

//  @PostMapping("/{articleId")
//  public ResponseEntity<String> response (@PathVariable("articldId") Long articleId) {
//    String response = articleService.regist
//  }

  // 작품 검색
  @GetMapping("/search/{keyword}")
  public List<ArticleResponse> articleSearch(@PathVariable("keyword") String keyword) {
    return articleService.findByKeyword(keyword);
  }
  @GetMapping("/searchId/{contractAddress}/{tokenId}")
  public ResponseArticleId articleIdSearch(@PathVariable("contractAddress") String contractAddress, @PathVariable("tokenId") String tokenId){
    System.out.println(articleService.findByArticleId(contractAddress, tokenId));
    if (articleService.findByArticleId(contractAddress, tokenId) == null)
      System.out.println(true);
    return articleService.findByArticleId(contractAddress, tokenId);
  }


  // 작가 검색
  @GetMapping("/AuthorSearch/{userId}")
  public List<ArticleResponse> findByOriginalAuthor(@PathVariable("userId") Long userId) {
    return articleService.findByOriginalAuthor(userId);
  }

  //작품 랭킹
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
}

