package com.nct.sellysearchservice.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TradeResponse {
  private Long tradeId;

  private Long seller;

  private Long buyer;

  private Long articleId;

  private Double tradePrice;

  private Integer pieceCnt;

  private Date tradeTime;

  private Date tradeRegistTime;

  private Date createRegist;

  private Date updateRegist;

  private boolean status;
}
