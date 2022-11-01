package com.nct.sellytradeservice.domain.entity;

import lombok.Builder;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class TradeLog {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long tradeId;

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
