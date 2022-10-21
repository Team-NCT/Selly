package com.nct.Selly.domain.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Entity
public class Piece {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long pieceId;

  private String serialNum;

  private Integer price;

  private Date createRegist;

  private Date updateRegist;

  public Piece (Long pieceId, String serialNum, Integer price, Date createRegist, Date updateRegist) {
    this.pieceId = pieceId;
    this.serialNum = serialNum;
    this.price = price;
    this.createRegist = createRegist;
    this.updateRegist = updateRegist;
  }
}
