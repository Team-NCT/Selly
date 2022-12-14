package com.nct.sellytradeservice.domain.dto;

import com.nct.sellytradeservice.domain.entity.TradeLog;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class TradeLogRequest {
  private Long seller;
  private Long buyer;
  private Long articleId;
  private double tradePrice;
  private Integer pieceCnt;
  private LocalDateTime tradeTime;
  private LocalDateTime tradeRegistTime;
  private LocalDateTime createRegist;
  private LocalDateTime updateRegist;
  private boolean status;
  private String contractAddress;

  @Builder
  public TradeLogRequest (Long seller, Long buyer, Long articleId, double tradePrice, Integer pieceCnt, String contractAddress, boolean status) {
    this.seller = seller;
    this.buyer = buyer;
    this.articleId = articleId;
    this.tradePrice = tradePrice;
    this.pieceCnt = pieceCnt;
    this.tradeTime = LocalDateTime.now();
    this.contractAddress = contractAddress;
    this.status = status;
  }

  public TradeLog toEntity() {
    return TradeLog.builder()
            .seller(seller)
            .buyer(buyer)
            .articleId(articleId)
            .tradePrice(tradePrice)
            .pieceCnt(pieceCnt)
            .contractAddress(contractAddress)
            .status(status)
            .build();
  }
}
