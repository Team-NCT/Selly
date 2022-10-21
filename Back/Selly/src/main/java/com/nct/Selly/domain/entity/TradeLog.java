package com.nct.Selly.domain.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Entity
public class TradeLog {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long tradeLogId;

  private Integer tradePrice;

  private Date tradeTime;

  private Date tradeRegistTime;

  private Date createRegist;

  private Date updateRegist;

  @ManyToOne
  private Users seller;

  @ManyToOne
  private Users buyer;

  @ManyToOne
  private Piece pieceId;

  @Builder
  public TradeLog(Long tradeLogId, Integer tradePrice, Date tradeTime, Date tradeRegistTime, Date createRegist, Date updateRegist, Users seller, Users buyer, Piece pieceId) {
    this.tradeLogId = tradeLogId;
    this.tradePrice = tradePrice;
    this.tradeTime = tradeTime;
    this.tradeRegistTime = tradeRegistTime;
    this.createRegist = createRegist;
    this.updateRegist = updateRegist;
    this.seller = seller;
    this.buyer = buyer;
    this.pieceId = pieceId;
  }
}
