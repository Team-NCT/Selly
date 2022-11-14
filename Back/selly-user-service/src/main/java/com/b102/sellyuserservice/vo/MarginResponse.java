package com.b102.sellyuserservice.vo;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MarginResponse {
  private double marginRate;
  private double totalAssetValue;
  private double margin;
  private double principal;

  @Builder
  public MarginResponse(double marginRate, double totalAssetValue, double margin, double principal) {
    this.marginRate = marginRate;
    this.totalAssetValue = totalAssetValue;
    this.margin = margin;
    this.principal = principal;
  }
}
