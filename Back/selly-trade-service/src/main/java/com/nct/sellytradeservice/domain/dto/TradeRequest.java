package com.nct.sellytradeservice.domain.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
public class TradeRequest {
  private Long articleId;
  private Long sellerId;
  private Long buyerId;
  private Integer pieceCnt;
  private double tradePrice;
  private String saleContractAddress;
  private String wallet;
}
