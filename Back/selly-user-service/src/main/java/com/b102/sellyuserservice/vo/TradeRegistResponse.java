package com.b102.sellyuserservice.vo;

import lombok.Builder;
import lombok.Getter;

@Getter
public class TradeRegistResponse {
  private Long seller;
  private Long articleId;
  private String saleContractAddress;
  private Integer pieceCnt;
  private double tradePrice;

  @Builder
  public TradeRegistResponse(Long seller, Long articleId, String saleContractAddress, Integer pieceCnt, double tradePrice) {
    this.seller = seller;
    this.articleId = articleId;
    this.saleContractAddress = saleContractAddress;
    this.tradePrice = tradePrice;
    this.pieceCnt = pieceCnt;
  }
}
