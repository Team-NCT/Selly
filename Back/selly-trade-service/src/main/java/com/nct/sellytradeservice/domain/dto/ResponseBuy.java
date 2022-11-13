package com.nct.sellytradeservice.domain.dto;

import lombok.Data;

@Data
public class ResponseBuy {
  private String saleContractAddress;
  private String sellerId;
  private String buyerId;
  private Integer pieceCnt;
  private double tradePrice;
}
