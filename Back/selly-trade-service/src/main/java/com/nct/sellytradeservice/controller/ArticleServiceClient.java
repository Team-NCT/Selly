package com.nct.sellytradeservice.controller;

import com.nct.sellytradeservice.domain.dto.ArticleResponse;
import com.nct.sellytradeservice.domain.dto.ArticleResponseDto;
import com.nct.sellytradeservice.domain.dto.ArticleUpdateRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "selly-article-service")
public interface ArticleServiceClient {
  @PostMapping("/selly-article-service/{id}")
  void sellRegist(@RequestBody ArticleUpdateRequest articleUpdateRequest, @PathVariable("id") Long id);

  @GetMapping("/selly-article-service/{id}")
  ArticleResponseDto articleResponse(@PathVariable("id") Long id);
}
