package com.nct.sellytradeservice.model.service;

import com.nct.sellytradeservice.domain.dto.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TradeService {
//  String registArticleSell(Long id, ArticleUpdateRequest articleUpdateRequest);

  ArticleResponseDto findById(Long id);

  List<TradeResponse> findAll();

  List<TradeResponse> findBySell(String sell);

  Long registP2pSell(SellRegistRequest sellRegistRequest);

  String postTradeLog(Long trade, TradeRequest tradeRequest);

}
