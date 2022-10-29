package com.nct.sellytradeservice.controller;

import com.nct.sellytradeservice.model.service.TradeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.bridge.Message;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/selly-trade-service")
@Slf4j
public class tradeController {

  private final TradeService tradeService;

  @PostMapping("/registArticleSell/{articleId}")
  public ResponseEntity<Object> registArticleSell(@PathVariable("articleId") Long articleId) {
    String response = tradeService.registArticleSell(articleId);
    return ResponseEntity.ok()
            .body(response);
  }
}
