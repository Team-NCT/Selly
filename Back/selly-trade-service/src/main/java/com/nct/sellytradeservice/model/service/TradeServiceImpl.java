package com.nct.sellytradeservice.model.service;

import com.nct.sellytradeservice.client.ArticleServiceClient;
import com.nct.sellytradeservice.domain.dto.*;
import com.nct.sellytradeservice.domain.entity.TradeLog;
import com.nct.sellytradeservice.model.repository.TradeLogRepository;
import com.nct.sellytradeservice.model.repository.TradeRegistRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TradeServiceImpl implements TradeService {

  private final ArticleServiceClient articleServiceClient;
  private final TradeLogRepository tradeLogRepository;

  private final TradeRegistRepository tradeRegistRepository;
//  @Override
//  public String registArticleSell(Long id, ArticleUpdateRequest articleUpdateRequest){
//    ArticleUpdateRequest.builder()
//                    .createRegist(LocalDateTime.now());
//    articleServiceClient.sellRegist(articleUpdateRequest, id);
//
//    return new String("asdf");
//  }

  @Override
  public ArticleResponseDto findById(Long id) {
    return articleServiceClient.articleResponse(id);
  }

  @Override
  public List<TradeResponse> findAll() {
    List<TradeLog> tradeLogList = tradeLogRepository.findAll();
    List<TradeResponse> tradeResponseList = new ArrayList<>();
    tradeLogList.forEach(v -> {
      tradeResponseList.add(new ModelMapper().map(v, TradeResponse.class));
    });
    return tradeResponseList;
  }

  @Override
  public List<TradeResponse> findBySell(String sell) {
    boolean status;
    List<TradeResponse> tradeResponseList = new ArrayList<>();
    if (Objects.equals(sell, "selling")) {
      status = true;
    } else if (Objects.equals(sell, "end")) {
      status = false;
    } else {
      List<TradeLog> articleList = tradeLogRepository.findAll();
      articleList.forEach(v -> {
        tradeResponseList.add(new ModelMapper().map(v, TradeResponse.class));
      });
      return tradeResponseList;
    }
    List<TradeLog> articleList = tradeLogRepository.findByStatus(status);
    articleList.forEach(v -> {
      tradeResponseList.add(new ModelMapper().map(v, TradeResponse.class));
    });
    return tradeResponseList;
  }

  @Transactional
  @Override
  public Long registP2pSell(SellRegistRequest sellRegistRequest) {
    tradeRegistRepository.save(sellRegistRequest.toEntity());
    articleServiceClient.sellRegist(sellRegistRequest.getArticleId());
    return 4L;
  }

  @Override
  public String postTradeLog(String trade, TradeRequest tradeRequest) {
    TradeLogResponse tradeLogResponse.build()
    tradeRequest.getArticleId();
    tradeLogRepository.save()
    return null;
  }
}
