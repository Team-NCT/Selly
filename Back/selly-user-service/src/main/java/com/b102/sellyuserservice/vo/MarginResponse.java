package com.b102.sellyuserservice.vo;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MarginResponse {
  //수익륙
  private double marginRate;
  //총 최근 거래 가격
  private double totalAssetValue;
  //총 수익
  private double margin;
  // 투자 원금
  private double principal;

  @Builder
  public MarginResponse(double marginRate, double totalAssetValue, double margin, double principal) {
    this.marginRate = marginRate;
    this.totalAssetValue = totalAssetValue;
    this.margin = margin;
    this.principal = principal;
  }
}
