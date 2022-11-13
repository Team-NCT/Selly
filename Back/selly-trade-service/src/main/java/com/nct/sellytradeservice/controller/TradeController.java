package com.nct.sellytradeservice.controller;

import com.nct.sellytradeservice.client.FeignClientException;
import com.nct.sellytradeservice.client.UserServiceClient;
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

  private final TradeService tradeService;
  private final TradeLogRepository tradeLogRepository;
  private final UserServiceClient userServiceClient;

  @GetMapping("/all")
  public List<TradeResponse> findAll() {
    return tradeService.findAll();
  }

  // 판매 중, 판매 끝난 리스트
  @GetMapping("/filter")
  public List<TradeResponse> getTradeBySellStatus(@RequestParam("sell") String sell) {
    return tradeService.findBySell(sell);
  }

//  @PostMapping("/registArticleSell/{id}")
//  public ResponseEntity<Object> registArticleSell(@PathVariable("id") Long id, @RequestBody ArticleUpdateRequest articleUpdateRequest) {
//    String response = tradeService.registArticleSell(id, articleUpdateRequest);
//    return ResponseEntity.ok()
//            .body(response);
//  }

  // 작품 조회
  @GetMapping("/{articleId}")
  public Object articleResponse(@PathVariable("articleId") Long articleId, @RequestParam("userId") Long userId) {
    ArticleResponseDto articleResponseDto = tradeService.findById(articleId, userId);
    if (articleResponseDto.getOwner() != null) {
      return articleResponseDto;
    }
    return null;
  }

  // 판매 등록
  @PostMapping("/p2p-sell-regist")
  public ResponseEntity<Object> response(@RequestBody SellRegistRequest sellRegistRequest) {
    String response = tradeService.registP2pSell(sellRegistRequest);
    return ResponseEntity.ok()
            .body(response);
  }

  // 유저간 거래 API
  @PostMapping("/trade")
  public ResponseEntity<Object> trade (@RequestParam("sellerId") Long sellerId, @RequestParam("buyerId") Long buyerId, @RequestBody TradeRequest tradeRequest) {
    Object response = null;
    try {
      response = tradeService.trade(sellerId, buyerId, tradeRequest);
    } catch (FeignClientException e) {
      if (!Integer.valueOf(HttpStatus.NOT_FOUND.value()).equals(e.getStatus())) {
        throw e;
      }
    }
    return ResponseEntity.ok()
            .body(response);
  }

  // 거래 기록 등록
  @PostMapping("/trade-log")
  public ResponseEntity<String> tradeLog (@RequestParam("trade")Long trade, @RequestBody TradeRequest tradeRequest) {
    String response = tradeService.postTradeLog(trade, tradeRequest);

    return ResponseEntity.ok()
            .body(response);
  }

  // 거래 기록 조회
  @GetMapping("/trade-log")
  public List<TradeRegistResponse> tradeRegistResponseList() {
    return tradeService.getTradeRegistList();
  }

  // 유저 거래 기록 조회
  @GetMapping("/trade-log/{userId}")
  public List<TradeRegistResponse> userTradeRegistResponseList(@PathVariable("userId") Long userId) {
    return tradeService.getUserTradeRegistList(userId);
  }


//  @GetMapping("/ownership/{userId}")
//  public ResponseEntity<Object> userOwnership (@PathVariable("userId") Long userId, @) {
//    System.out.println(userId);
//    NftPieceResponseDto nftPieceResponseDto = userServiceClient.getOwnership(userId, tradeRequest);
//    return ResponseEntity.ok().body(nftPieceResponseDto);
//  }
}
