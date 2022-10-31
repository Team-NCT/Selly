package com.nct.sellytradeservice.domain.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class TradeLog {
  @Id
  private Long tradeId;

  private Long seller;

  private Long buyer;

  private Double tradePrice;

  private Integer pieceCnt;

  private Date tradeTime;

  private Date tradeRegistTime;

  private Date createRegist;

  private Date updateRegist;
}
