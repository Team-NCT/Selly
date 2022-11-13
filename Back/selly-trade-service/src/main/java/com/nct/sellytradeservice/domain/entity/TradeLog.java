package com.nct.sellytradeservice.domain.entity;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;
import java.util.Date;
@Getter
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

  @Builder
  public TradeLog(Long seller, Long buyer, Long articleId, Double tradePrice, Integer pieceCnt, String contractAddress, boolean status) {
    this.seller = seller;
    this.buyer = buyer;
    this.articleId = articleId;
    this.tradePrice = tradePrice;
    this.pieceCnt = pieceCnt;
    this.tradeTime = LocalDateTime.now();
    this.contractAddress = contractAddress;
    this.status = status;
  }
}
