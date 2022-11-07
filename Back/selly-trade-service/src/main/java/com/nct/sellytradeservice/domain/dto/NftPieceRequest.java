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
  private String role;

  @Builder
  public NftPieceRequest(Long articleId, Long userId, Integer nftPieceCnt, double avgPrice, String role) {
    this.articleId = articleId;
    this.userId = userId;
    this.nftPieceCnt = nftPieceCnt;
    this.avgPrice = avgPrice;
    this.role = role;
  }
}
