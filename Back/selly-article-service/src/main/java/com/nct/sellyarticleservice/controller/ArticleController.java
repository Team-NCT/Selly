package com.nct.sellyarticleservice.controller;

import com.nct.sellyarticleservice.domain.dto.ArticleRequest;
import com.nct.sellyarticleservice.domain.dto.ArticleResponse;
import com.nct.sellyarticleservice.domain.dto.ArticleResponseDto;
import com.nct.sellyarticleservice.domain.entity.Article;
import com.nct.sellyarticleservice.model.service.ArticleServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/selly-article-service")
@Slf4j
public class ArticleController {

  private final ArticleServiceImpl articleService;

  @PostMapping("/create")
  public Long createArticle(@RequestBody ArticleRequest articleRequest) throws SQLException{
    return articleService.createArticle(articleRequest);
  }

  @GetMapping("")
  public List<Article> getArticleByAll() {
    return articleService.findByAll();
  }

  @GetMapping("/{id}")
  public ArticleResponseDto findById (@PathVariable("id") Long id) {
    return articleService.findById(id);
  }

  @GetMapping("/number-of-article")
  public Long numberOfArticle() {
    return articleService.numberOfArticle();
  }

  @GetMapping("/filter/{category}")
  public List<Article> articleCategoryFilter(@PathVariable("category") String category) {
    return articleService.articleCategoryFilter(category);
  }

}
