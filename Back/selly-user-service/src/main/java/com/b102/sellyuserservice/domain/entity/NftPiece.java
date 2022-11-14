package com.b102.sellyuserservice.domain.entity;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@EntityListeners(value= AuditingEntityListener.class)
@Entity
public class NftPiece {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long pieceId;
  private Long articleId;
  private Long userId;
  private Integer nftPieceCnt;
  private double avgPrice;
  private boolean trade;
  private String contractAddress;

  @CreatedDate
  private LocalDateTime createRegist;
  @LastModifiedDate
  private LocalDateTime updateRegist;

  public void updateOwnership(Integer nftPieceCnt, double avgPrice, boolean trade) {
    this.nftPieceCnt = nftPieceCnt;
    this.avgPrice = avgPrice;
    this.trade = trade;
  }
  public void updateTrade(boolean trade) {
    this.trade = trade;
  }
  @Builder
  public NftPiece(Long pieceId, Long articleId, Long userId, Integer nftPieceCnt, double avgPrice, String contractAddress, boolean trade) {
    this.pieceId = pieceId;
    this.articleId = articleId;
    this.userId = userId;
    this.nftPieceCnt = nftPieceCnt;
    this.avgPrice = avgPrice;
    this.contractAddress = contractAddress;
    this.trade = trade;
  }

  public void postNftPiece(Long pieceId, Long articleId, Long userId, Integer nftPieceCnt, double avgPrice){
    this.pieceId = pieceId;
    this.articleId = articleId;
    this.userId = userId;
    this.nftPieceCnt = nftPieceCnt;
    this.avgPrice = avgPrice;
  }
}
