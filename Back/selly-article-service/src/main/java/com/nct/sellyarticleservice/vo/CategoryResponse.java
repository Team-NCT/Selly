package com.nct.sellyarticleservice.vo;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CategoryResponse {
  private Long articleId;
  private String articleName;
  private String articleImgUrl;
  private double recentMarketPrice;
  private double rateChange;

  @Builder
  public CategoryResponse(Long articleId, String articleName, String articleImgUrl, double recentMarketPrice, double rateChange) {
    this.articleId = articleId;
    this.articleName = articleName;
    this.articleImgUrl = articleImgUrl;
    this.recentMarketPrice = recentMarketPrice;
    this.rateChange = rateChange;
  }
}
