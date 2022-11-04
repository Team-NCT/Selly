package com.nct.sellytradeservice.client;

import com.nct.sellytradeservice.domain.dto.ArticleResponse;
import com.nct.sellytradeservice.domain.dto.ArticleResponseDto;
import com.nct.sellytradeservice.domain.dto.ArticleUpdateRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "selly-article-service")
public interface ArticleServiceClient {
  @PostMapping("/selly-article-service/{articleId}")
//  void sellRegist(@RequestBody ArticleUpdateRequest articleUpdateRequest, @PathVariable("id") Long id);
  void sellRegist(@PathVariable("articleId") Long articleId);

  @GetMapping("/selly-article-service/{id}")
//  Object articleResponse(@PathVariable("id") Long id);
  ArticleResponseDto articleResponse(@PathVariable("id") Long id);
}
