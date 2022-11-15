package com.nct.sellytradeservice.domain.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class TradeRegistResponse {
  private Long seller;
  private String saleContractAddress;
  private Integer pieceCnt;
  private double tradePrice;

  @Builder
  public TradeRegistResponse(Long seller, String saleContractAddress, Integer pieceCnt, double tradePrice) {
    this.seller = seller;
    this.saleContractAddress = saleContractAddress;
    this.tradePrice = tradePrice;
    this.pieceCnt = pieceCnt;
  }
}
