package com.nct.sellytradeservice.domain.dto;

import lombok.Getter;

@Getter
public class NftPieceDto {
  private Long articleId;
  private Long userId;
  private Integer nftPieceCnt;
  private double avgPrice;
}
