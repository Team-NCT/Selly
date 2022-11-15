package com.nct.sellysearchservice.client;

import com.nct.sellysearchservice.domain.TradeResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "selly-trade-service")
public interface TradeServiceClient {

  @GetMapping("/selly-trade-service/all")
  List<TradeResponse> allTrade();
  @GetMapping("/selly-trade-service/{sell}")
  List<TradeResponse> tradeResponse(@PathVariable("sell") String sell);
}
