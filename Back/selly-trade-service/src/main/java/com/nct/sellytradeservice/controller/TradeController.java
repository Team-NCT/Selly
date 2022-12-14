package com.nct.sellytradeservice.controller;

import com.nct.sellytradeservice.client.ArticleServiceClient;
import com.nct.sellytradeservice.client.FeignClientException;
import com.nct.sellytradeservice.client.UserServiceClient;
import com.nct.sellytradeservice.domain.dto.*;
import com.nct.sellytradeservice.domain.entity.TradeRegist;
import com.nct.sellytradeservice.model.repository.TradeLogRepository;
import com.nct.sellytradeservice.model.repository.TradeRegistRepository;
import com.nct.sellytradeservice.model.service.TradeLogService;
import com.nct.sellytradeservice.model.service.TradeService;
import com.nct.sellytradeservice.model.service.TradeServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.mapper.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/selly-trade-service")
@Slf4j
public class TradeController {

  private final TradeService tradeService;
  private final TradeLogRepository tradeLogRepository;
  private final UserServiceClient userServiceClient;
  private final TradeLogService tradeLogService;
  private final TradeRegistRepository tradeRegistRepository;

  private final ArticleServiceClient articleServiceClient;

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
//  public ResponseEntity<Object> trade (@RequestParam("sellerId") Long sellerId, @RequestParam("buyerId") Long buyerId, @RequestBody TradeRequest tradeRequest) {
  public ResponseEntity<Object> trade (@RequestBody TradeRequest tradeRequest) {
    Object response = null;
    try {
      response = tradeService.trade(tradeRequest.getSellerId(), tradeRequest.getBuyerId(), tradeRequest);
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

  // 특정 작품 거래 등록 조회
  @GetMapping("/trade-regist/{articleId}")
  public List<TradeRegistResponse> tradeRegistResponseList(@PathVariable("articleId") Long articleId) {
    return tradeService.getTradeRegistList(articleId);
  }

  // 특정 유저, 특정 작품 거래 등록 조회
  @GetMapping("/trade-regist/{userId}/{articleId}")
  public List<TradeRegistResponse> userTradeRegistResponseList(@PathVariable("userId") Long userId, @PathVariable("articleId") Long articleId) {
    return tradeService.getUserTradeRegistList(userId, articleId);
  }

  @DeleteMapping("/trade-cancel")
  public String deleteTradeRegist(@RequestBody RequestDeleteTradeRegist requestDeleteTradeRegist){
    return tradeService.dropTradeRegist(requestDeleteTradeRegist);
  }

//  @GetMapping("/ownership/{userId}")
//  public ResponseEntity<Object> userOwnership (@PathVariable("userId") Long userId, @) {
//    System.out.println(userId);
//    NftPieceResponseDto nftPieceResponseDto = userServiceClient.getOwnership(userId, tradeRequest);
//    return ResponseEntity.ok().body(nftPieceResponseDto);
//  }

  @GetMapping("/trade-log/{sellerId}")
  public float searchSellerLog(@PathVariable("sellerId") Long sellerId){
    return tradeLogService.searchPieceAndPriceLog(sellerId);
  }
  @GetMapping("/trade-ranking")
  public ResponseEntity<List<TradeRankDto>> tradeRanking(){
    List<TradeRankDto> tradeRankDto = tradeLogService.tradeRank();
    if (tradeRankDto != null){
      return ResponseEntity.status(HttpStatus.OK).body(tradeRankDto);
    }
    else{
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
  }
  @GetMapping("/trade-article-count/{userId}")
  public Integer sellerArticleCount(@PathVariable("userId") Long userId){
    return tradeLogRepository.countBySeller(userId);
  }

  @GetMapping("/trade-search/{userId}")
  public List<Long> searchSellerArticleId(@PathVariable("userId") Long userId){
    List<Long> returnValue = tradeRegistRepository.findSellerGroupByArticleId(userId);
    System.out.println(returnValue);
    return returnValue;
  }

  // 히스토리 조회
  @GetMapping("/nft-trade-history/{articleId}")
  public  HashMap<String, Object> articleHistory(@PathVariable("articleId") Long articleId){
    return tradeLogService.historyArticle(articleId);
  }
  // 자정 기준 거래가 변동률 조회
  @GetMapping("/rateChange/{articleId}")
  public double rateChange(@PathVariable("articleId") Long articleId) {
    return tradeLogService.rateChange(articleId);
  }

  @GetMapping("/user-trade-regist/{userId}")
  public List<TradeResponse> getTradeRegist(@PathVariable("userId") Long userId) {
    System.out.println("############################");
    List<TradeResponse> tradeResponseList = new ArrayList<>();
    List<TradeRegist> tradeRegistList = tradeRegistRepository.findBySellerAndStatus(userId, true);
    tradeRegistList.forEach( v -> {
      System.out.println(v);
      TradeResponse tradeResponse = TradeResponse.builder()
              .articleId(v.getArticleId())
              .build();
      tradeResponseList.add(tradeResponse);
    });
    return tradeResponseList;
  }
}
