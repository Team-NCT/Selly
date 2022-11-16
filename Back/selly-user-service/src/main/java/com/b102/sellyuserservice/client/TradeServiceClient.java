package com.b102.sellyuserservice.client;

import com.b102.sellyuserservice.vo.ArticleResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.math.BigDecimal;

@FeignClient(name = "selly-trade-service")
public interface TradeServiceClient {
  @GetMapping("/selly-trade-service/trade-log/{sellerId}")
  float getLog(@PathVariable("sellerId") Long sellerId);

  @GetMapping("/selly-trade-service/trade-article-count/{userId}")
  Integer getArticleCount(@PathVariable("userId") Long userId);
}
