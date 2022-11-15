package com.nct.sellysearchservice.client;

import com.nct.sellysearchservice.domain.ArticleResponse;
import com.nct.sellysearchservice.domain.ArticleResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "selly-article-service")
public interface ArticleServiceClient {

  @GetMapping("/selly-article-service/{sell}")
  List<ArticleResponseDto> articleResponse(@PathVariable("sell") String sell);

  @GetMapping("/selly-article-service/{auction}")
  List<ArticleResponseDto> articleAuctionResponse(String auction);

  @GetMapping("/selly-article-service/search/{keyword}")
  List<ArticleResponse> articleSearchResponse(@PathVariable("keyword") String keyword);
}
