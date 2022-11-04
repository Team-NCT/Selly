package com.nct.sellytradeservice.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class NftPieceRequest{
  private Long articleId;
  private Long userId;
  private Integer nftPieceCnt;
  private double avgPrice;

  @Builder
  public NftPieceRequest(Long articleId, Long userId, Integer nftPieceCnt, double avgPrice) {
    this.articleId = articleId;
    this.userId = userId;
    this.nftPieceCnt = nftPieceCnt;
    this.avgPrice = avgPrice;
  }
}
