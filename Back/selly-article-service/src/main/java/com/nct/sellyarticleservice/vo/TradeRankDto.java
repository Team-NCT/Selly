package com.nct.sellyarticleservice.vo;

import lombok.Data;

@Data
public class TradeRankDto {
  private Long articleId;
  private Integer tradeCount;
  private Integer pieceCount;
}
