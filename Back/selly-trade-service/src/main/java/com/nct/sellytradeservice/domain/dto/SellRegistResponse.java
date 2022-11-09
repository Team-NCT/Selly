package com.nct.sellytradeservice.domain.dto;

import lombok.Data;

@Data
public class SellRegistResponse {
  private Long articleId;
  private Double price;
  private Integer primaryCnt;
  private boolean availability;
  private String saleContractAddress;

}
