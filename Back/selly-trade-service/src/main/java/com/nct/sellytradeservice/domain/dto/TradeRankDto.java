package com.nct.sellytradeservice.domain.dto;

import lombok.Data;

@Data
public class TradeRankDto {
  private Long articleId;
  private Integer tradeCount;
  private Integer pieceCount;
}
