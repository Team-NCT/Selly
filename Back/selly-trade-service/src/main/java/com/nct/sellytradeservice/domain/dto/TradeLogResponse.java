package com.nct.sellytradeservice.domain.dto;

import lombok.Builder;

import java.time.LocalDateTime;

public class TradeLogResponse {
  private Long seller;
  private Long buyer;
  private Long articleId;
  private Double tradePrice;
  private Integer pieceCnt;
  private LocalDateTime tradeTime;
  private LocalDateTime tradeRegistTime;
  private LocalDateTime createRegist;
  private LocalDateTime updateRegist;
  private boolean status;
  private String contractAddress;
}
@Builder
public TradeLogResponse (Long seller, Long buyer, Long articleId, Double tradePrice, Integer pieceCnt, boolean status, String contractAddress) {
  
}
