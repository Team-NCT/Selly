package com.nct.sellytradeservice.domain.dto;

import lombok.Data;

@Data
public class RequestDeleteTradeRegist {
  private String saleContractAddress;
  private String wallet;
  private Long seller;
}
