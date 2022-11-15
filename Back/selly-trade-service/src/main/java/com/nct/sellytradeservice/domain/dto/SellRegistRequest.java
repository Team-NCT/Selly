package com.nct.sellytradeservice.domain.dto;

import com.nct.sellytradeservice.domain.entity.TradeLog;
import com.nct.sellytradeservice.domain.entity.TradeRegist;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
public class SellRegistRequest {
  private Long seller;
  private Long articleId;
  private double tradePrice;
  private Integer pieceCnt;
//  private LocalDateTime tradeRegistTime;
  private String contractAddress;
  private String tokenId;
  private boolean status;
  private boolean articleOwner;
  private String saleContractAddress;

  @Builder
  public SellRegistRequest(Long seller, Long articleId, double tradePrice, String tokenId, Integer pieceCnt, LocalDateTime tradeRegistTime, String contractAddress, boolean status, boolean articleOwner, String saleContractAddress) {
    this.seller = seller;
    this.articleId = articleId;
    this.tradePrice = tradePrice;
    this.pieceCnt = pieceCnt;
    this.tokenId = tokenId;
//    this.tradeRegistTime = LocalDateTime.now();
    this.contractAddress = contractAddress;
    this.status = status;
    this.articleOwner = articleOwner;
    this.saleContractAddress = saleContractAddress;
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
            .saleContractAddress(saleContractAddress)
            .build();
  }
}
