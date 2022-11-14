package com.b102.sellyuserservice.client;

import com.b102.sellyuserservice.vo.ArticleResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "selly-article-service")
public interface ArticleServiceClient {
  @GetMapping("/selly-article-service/{articleId}")
  ArticleResponse getArticle(@PathVariable("articleId") Long articleId);

  @GetMapping("/selly-article-service/AuthorSearch/{userId}")
  List<ArticleResponse> searchByOwner(@PathVariable("userId") Long userId);
}
