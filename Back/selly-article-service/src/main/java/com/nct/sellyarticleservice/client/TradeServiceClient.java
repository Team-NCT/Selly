package com.nct.sellyarticleservice.client;

import com.nct.sellyarticleservice.vo.TradeRankDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "selly-trade-service")
public interface TradeServiceClient {
  @GetMapping("/selly-trade-service/trade-ranking")
  List<TradeRankDto> tradeRanking();

  @GetMapping("/selly-trade-service/rateChange/{articleId}")
  double rateChange(@PathVariable("articleId") Long articleId);
}
