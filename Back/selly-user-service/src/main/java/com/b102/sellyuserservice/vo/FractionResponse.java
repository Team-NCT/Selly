package com.b102.sellyuserservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.Nullable;

@RequiredArgsConstructor
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FractionResponse {
  private Long articleId;
  private String articleName;
  private String articleImgUrl;
  @Nullable
  private Double recentMarketPrice;
  @Nullable
  private Double rateChange;
  private Integer pieceCnt;

  @Builder
  public FractionResponse(Long articleId, String articleName, String articleImgUrl, Double recentMarketPrice, Double rateChange, Integer pieceCnt) {
    this.articleId = articleId;
    this.articleName = articleName;
    this.articleImgUrl = articleImgUrl;
    this.recentMarketPrice = recentMarketPrice;
    this.rateChange = rateChange;
    this.pieceCnt = pieceCnt;
  }
  public FractionResponse(Long articleId, String articleName, String  articleImgUrl) {
    this.articleId = articleId;
    this.articleName = articleName;
    this.articleImgUrl = articleImgUrl;
    this.recentMarketPrice = null;
    this.rateChange = null;
  }
}
