package com.nct.sellytradeservice.domain.entity;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@EntityListeners(value= AuditingEntityListener.class)
public class TradeRegist {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long tradeRegistId;
  private Long seller;
  private Long articleId;
  private double tradePrice;
  private Integer pieceCnt;
  @CreatedDate
  private LocalDateTime tradeRegistTime;
  @LastModifiedDate
  private LocalDateTime tradeUpdateTime;
  private String contractAddress;
  private boolean status;
  private String saleContractAddress;

  public TradeRegist() {
  }

  @Builder
  public TradeRegist(Long seller, Long articleId, double tradePrice, Integer pieceCnt, LocalDateTime tradeRegistTime, String contractAddress, boolean status, String saleContractAddress) {
    this.seller = seller;
    this.articleId = articleId;
    this.tradePrice = tradePrice;
    this.pieceCnt = pieceCnt;
    this.tradeRegistTime = tradeRegistTime;
    this.contractAddress = contractAddress;
    this.status = status;
    this.saleContractAddress = saleContractAddress;
  }

  public void updateTradeRegist(Integer pieceCnt, boolean status) {
    this.pieceCnt = pieceCnt;
    this.status = status;
  }

}
