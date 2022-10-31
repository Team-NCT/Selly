package com.nct.sellytradeservice.controller;

import com.nct.sellytradeservice.domain.dto.ArticleResponseDto;
import com.nct.sellytradeservice.domain.dto.ArticleUpdateRequest;
import com.nct.sellytradeservice.model.service.TradeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/selly-trade-service")
@Slf4j
public class TradeController {

  private final TradeService tradeService;

  @PostMapping("/registArticleSell/{id}")
  public ResponseEntity<Object> registArticleSell(@PathVariable("id") Long id, @RequestBody ArticleUpdateRequest articleUpdateRequest) {
    String response = tradeService.registArticleSell(id, articleUpdateRequest);
    return ResponseEntity.ok()
            .body(response);
  }

  @GetMapping("/{id}")
  public ArticleResponseDto articleResponse(@PathVariable("id") Long id) {
    return tradeService.findById(id);
  }
}
