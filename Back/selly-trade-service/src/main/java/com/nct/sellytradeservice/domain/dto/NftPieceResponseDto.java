package com.nct.sellytradeservice.domain.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Data
@NoArgsConstructor
public class NftPieceResponseDto {
  private Long articleId;
  private Long userId;
  private Integer nftPieceCnt;
  private double avgPrice;
  private String contractAddress;


  @Builder
  public NftPieceResponseDto(Long articleId, Long userId, Integer nftPieceCnt, double avgPrice) {
    this.articleId = articleId;
    this.userId = userId;
    this.nftPieceCnt = nftPieceCnt;
    this.avgPrice = avgPrice;
  }
}
