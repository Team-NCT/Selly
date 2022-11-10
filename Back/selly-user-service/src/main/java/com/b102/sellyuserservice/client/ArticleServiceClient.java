package com.b102.sellyuserservice.client;

import com.b102.sellyuserservice.vo.ArticleResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "selly-article-service")
public interface ArticleServiceClient {
  @GetMapping("/{articleId}")
  ArticleResponse getArticle(@PathVariable("articleId") Long aritlceId);
}
