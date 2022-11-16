package com.nct.sellytradeservice.domain.dto;

import lombok.Data;

import javax.persistence.Column;

@Data
public class ResponseSelectQuery {
  @Column(name = "SUM(pieceCnt)")
  private Integer pieceCount;

}
