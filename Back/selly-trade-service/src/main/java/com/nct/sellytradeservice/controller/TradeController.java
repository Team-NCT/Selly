package com.nct.sellytradeservice.controller;

import com.nct.sellytradeservice.domain.dto.*;
import com.nct.sellytradeservice.model.repository.TradeLogRepository;
import com.nct.sellytradeservice.model.service.TradeService;
import com.nct.sellytradeservice.model.service.TradeServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/selly-trade-service")
@Slf4j
public class TradeController {

  private final TradeServiceImpl tradeService;
  private final TradeLogRepository tradeLogRepository;

  @GetMapping("/all")
  public List<TradeResponse> findAll() {
    return tradeService.findAll();
  }

  @GetMapping("/filter")
  public List<TradeResponse> getTradeBySellStatus(@PathVariable("sell") String sell) {
    return tradeService.findBySell(sell);
  }

//  @PostMapping("/registArticleSell/{id}")
//  public ResponseEntity<Object> registArticleSell(@PathVariable("id") Long id, @RequestBody ArticleUpdateRequest articleUpdateRequest) {
//    String response = tradeService.registArticleSell(id, articleUpdateRequest);
//    return ResponseEntity.ok()
//            .body(response);
//  }

  @GetMapping("/{id}")
  public ArticleResponseDto articleResponse(@PathVariable("id") Long id) {
    return tradeService.findById(id);
  }

  // 유저간 거래 등록
  @PostMapping("/p2p-sell-regist")
  public ResponseEntity<Object> response(@RequestBody SellRegistRequest sellRegistRequest) {
    String response = tradeService.registP2pSell(sellRegistRequest);
    return ResponseEntity.ok()
            .body(response);
  }

  // 거래 API
  @PostMapping("/trade")
  public ResponseEntity<Object> response(@RequestParam("sellerId") Long sellerId, @RequestParam("buyerId") Long buyerId, @RequestBody TradeRequest tradeRequest) {
    Object response = tradeService.trade(sellerId, buyerId, tradeRequest);
    return ResponseEntity.ok()
            .body(response);
  }

  @PostMapping("/trade-log")
  public ResponseEntity<String> response (@RequestParam("trade")Long trade, @RequestBody TradeRequest tradeRequest) {
    String response = tradeService.postTradeLog(trade, tradeRequest);

    return ResponseEntity.ok()
            .body(response);
  }
}
