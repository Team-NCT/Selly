package com.b102.sellyuserservice.vo;

import lombok.Getter;

@Getter
public class TradeRequest {
  private Long articleId;
  private Long buyer;
  private Integer pieceCnt;
  private double tradePrice;
  private String contractAddress;
}
