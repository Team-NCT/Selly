package com.nct.sellyarticleservice.vo;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ArticleRankingResponse {
  private Long articleId;
  private String articleImgUrl;
  private String articleName;
  private Integer presentSalePieceCnt;

  @Builder
  public ArticleRankingResponse(Long articleId, String articleImgUrl, String articleName, Integer presentSalePieceCnt) {
    this.articleId = articleId;
    this.articleImgUrl = articleImgUrl;
    this.articleName = articleName;
    this.presentSalePieceCnt = presentSalePieceCnt;
  }
}
