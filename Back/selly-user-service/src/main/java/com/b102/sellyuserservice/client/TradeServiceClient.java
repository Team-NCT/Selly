package com.b102.sellyuserservice.client;

import com.b102.sellyuserservice.vo.TradeRegistResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "selly-trade-service", url = "https://127.0.0.1:8000")
public interface TradeServiceClient {
  @GetMapping("/selly-trade-service/trade-regist-by-user/{userId}")
  List<TradeRegistResponse> getUserTradeRegist(@PathVariable("userId") Long userId);
}
