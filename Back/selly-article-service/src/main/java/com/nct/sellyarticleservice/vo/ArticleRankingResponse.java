package com.nct.sellyarticleservice.vo;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
public class ArticleRankingResponse {
  private Long articleId;
  private String articleImgUrl;
  private String articleName;
  private Integer presentSalePieceCnt;
  private Integer primaryCnt;
}
