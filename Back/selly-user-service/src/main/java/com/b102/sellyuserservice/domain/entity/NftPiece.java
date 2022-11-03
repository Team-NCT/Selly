package com.b102.sellyuserservice.domain.entity;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@EntityListeners(value= AuditingEntityListener.class)
public class NftPiece {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long pieceId;
  private Long articleId;
  private Long userId;
  private Integer nftPieceCnt;
  private double avgPrice;
  @CreatedDate
  private LocalDateTime createRegist;
  @LastModifiedDate
  private LocalDateTime updateRegist;

  public void updateOwnership(Integer nftPieceCnt, double avgPrice) {
  this.nftPieceCnt = nftPieceCnt;
  this.avgPrice = avgPrice;
  }
}
