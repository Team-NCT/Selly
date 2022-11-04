package com.b102.sellyuserservice.vo;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class NftPieceRequest {
  private Long articleId;
  private Long userId;
  private Long nftPieceCnt;
  private double avgPrice;

  @Builder
  public NftPieceRequest(Long articleId, Long userId, Long nftPieceCnt, double avgPrice) {
    this.articleId = articleId;
    this.userId = userId;
    this.nftPieceCnt = nftPieceCnt;
    this.avgPrice = avgPrice;
  }
}
