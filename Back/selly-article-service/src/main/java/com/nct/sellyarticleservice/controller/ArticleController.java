package com.nct.sellyarticleservice.controller;

import com.nct.sellyarticleservice.domain.dto.ArticleRequest;
import com.nct.sellyarticleservice.domain.dto.ArticleResponse;
import com.nct.sellyarticleservice.domain.dto.ArticleResponseDto;
import com.nct.sellyarticleservice.domain.dto.ArticleUpdateRequest;
import com.nct.sellyarticleservice.domain.entity.Article;
import com.nct.sellyarticleservice.model.repository.ArticleRepository;
import com.nct.sellyarticleservice.model.service.ArticleServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@RestController
@RequestMapping("/selly-article-service")
@Slf4j
public class ArticleController {

  private final ArticleServiceImpl articleService;

  private final ArticleRepository articleRepository;
  @GetMapping("/{id}")
  public ArticleResponseDto findById (@PathVariable("id") Long id) {
    return articleService.findById(id);
  }

  @PostMapping("/create")
  public Long createArticle(@RequestBody ArticleRequest articleRequest) throws SQLException{
    return articleService.createArticle(articleRequest);
  }

  @GetMapping("")
  public List<Article> getArticleByAll() {
    return articleService.findByAll();
  }


  @GetMapping("/number-of-article")
  public Long numberOfArticle() {
    return articleService.numberOfArticle();
  }

  // 카테고리 정렬
  @GetMapping("/category-filter/{category}")
  public List<Article> articleCategoryFilter(@PathVariable("category") String category) {
    boolean availability = true;
    return articleService.articleCategoryFilter(category, availability);
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
  @GetMapping("/filter")
  public List<Article> articleFilter(@RequestParam("criterion")String criterion, @RequestParam("order") String order) {
    List<Article> articleList = new ArrayList<>();
    if (criterion == "sale") {
      switch (order) {
        case "selling":
          articleList = articleRepository.findByAvailability(true, Sort.by(Sort.Direction.DESC, "createRegist"));
          break;
        case "soldout":
          articleList = articleRepository.findByAvailability(false, Sort.by(Sort.Direction.DESC, "createRegist"));
          break;
        case "all":
          articleList = articleRepository.findAll(Sort.by(Sort.Direction.DESC, "createRegist"));
          break;
      }
      // 소유 조각 목록에서 내 Id로 조회한 뒤 중복되는 articleId 제거후 반환
    }else {
      switch (order) {
        case "selling":
          articleList = articleRepository.findByAvailability(true, Sort.by(Sort.Direction.DESC, "createRegist"));
          break;
        case "soldout":
          articleList = articleRepository.findByAvailability(false, Sort.by(Sort.Direction.DESC, "createRegist"));
          break;
        case "all":
          articleList = articleRepository.findAll(Sort.by(Sort.Direction.DESC, "createRegist"));
          break;
      }
    }
    return articleList;
  }

  // 판매 등록 call
  @PostMapping("/{id}")
  public ResponseEntity<String> response(@RequestBody ArticleUpdateRequest articleUpdateRequest, @PathVariable("id") Long id) {
    ArticleResponse articleResponse = articleService.updateArticle(articleUpdateRequest, id);
    String response = "success";
    return ResponseEntity.ok()
            .body(response);
  }
}
