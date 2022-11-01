package com.nct.sellytradeservice.domain.dto;

import com.nct.sellytradeservice.domain.entity.TradeLog;
import com.nct.sellytradeservice.domain.entity.TradeRegist;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;


@Getter
@NoArgsConstructor
public class SellRegistRequest {
  private Long seller;
  private Long articleId;
  private double tradePrice;
  private Integer pieceCnt;
//  private LocalDateTime tradeRegistTime;
  private String contractAddress;

  private boolean status;

  @Builder
  public SellRegistRequest(Long seller, Long articleId, double tradePrice, Integer pieceCnt, LocalDateTime tradeRegistTime, String contractAddress, boolean status) {
    this.seller = seller;
    this.articleId = articleId;
    this.tradePrice = tradePrice;
    this.pieceCnt = pieceCnt;
//    this.tradeRegistTime = LocalDateTime.now();
    this.contractAddress = contractAddress;
    this.status = status;
  }

  public TradeRegist toEntity() {
    return TradeRegist.builder()
            .seller(seller)
            .articleId(articleId)
            .tradePrice(tradePrice)
            .pieceCnt(pieceCnt)
            .tradeRegistTime(LocalDateTime.now())
            .contractAddress(contractAddress)
            .status(status)
            .build();
  }
}
