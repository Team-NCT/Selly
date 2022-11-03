package com.b102.sellyuserservice.domain.dto;

import lombok.Data;

@Data
public class NftPieceDto {
  private Long articleId;
  private Long userId;
  private Long nftPieceCnt;
  private double avgPrice;
}
