package com.nct.sellytradeservice.model.service;

import com.nct.sellytradeservice.domain.dto.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TradeService {
//  String registArticleSell(Long id, ArticleUpdateRequest articleUpdateRequest);

  ArticleResponseDto findById(Long articleId, Long userId);

  List<TradeResponse> findAll();

  List<TradeResponse> findBySell(String sell);

  String registP2pSell(SellRegistRequest sellRegistRequest);

  String postTradeLog(Long trade, TradeRequest tradeRequest);

  Object trade(Long sellerId, Long buyerId, TradeRequest tradeRequest);

  List<TradeRegistResponse> getTradeRegistList();

  List<TradeRegistResponse> getUserTradeRegistList(Long userId);
}
