package com.nct.sellytradeservice.domain.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
@Getter
public class HistoryResponse {
  private LocalDateTime date;
  private double avgPrice;
  private double lowPrice;
  private double maxPrice;

  @Builder
  public HistoryResponse (LocalDateTime date, double avgPrice, double lowPrice, double maxPrice) {
    this.date = date;
    this.avgPrice = avgPrice;
    this.lowPrice = lowPrice;
    this.maxPrice = maxPrice;
  }
}
