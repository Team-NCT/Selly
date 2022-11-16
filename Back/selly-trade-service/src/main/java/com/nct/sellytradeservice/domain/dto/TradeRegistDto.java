package com.nct.sellytradeservice.domain.dto;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Data
public class TradeRegistDto {
  private Long tradeRegistId;
  private Long seller;
  private Long articleId;
  private double tradePrice;
  private Integer pieceCnt;
  private LocalDateTime tradeRegistTime;
  private LocalDateTime tradeUpdateTime;
  private String contractAddress;
  private boolean status;
  private String saleContractAddress;
}
