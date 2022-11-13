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

  private String wallet;
  private double tradePrice;
  private Integer pieceCnt;
//  private LocalDateTime tradeRegistTime;
  private String contractAddress;
  private String tokenId;
  private boolean status;

  private String category;

  private String meteDataUrl;

  private String articleImgUrl;

  private String articleName;
  private String ownershipContractAddress;
  @Builder
  public SellRegistRequest(Long seller, double tradePrice, String tokenId, Integer pieceCnt, String contractAddress, boolean status, String category, String meteDataUrl, String articleImgUrl, String wallet, String articleName, String ownershipContractAddress) {
    this.seller = seller;
    this.tradePrice = tradePrice;
    this.pieceCnt = pieceCnt;
    this.tokenId = tokenId;
//    this.tradeRegistTime = LocalDateTime.now();
    this.contractAddress = contractAddress;
    this.status = status;
    this.category = category;
    this.meteDataUrl = meteDataUrl;
    this.articleImgUrl = articleImgUrl;
    this.wallet = wallet;
    this.articleName = articleName;
    this.ownershipContractAddress = ownershipContractAddress;
  }

  public TradeRegist toEntity() {
    return TradeRegist.builder()
            .seller(seller)
            .tradePrice(tradePrice)
            .pieceCnt(pieceCnt)
            .tradeRegistTime(LocalDateTime.now())
            .contractAddress(contractAddress)
            .status(status)
            .build();
  }
}
