package com.nct.sellyarticleservice.domain.dto;

import lombok.Getter;

@Getter
public class ResponseArticleUpdate {
  private Long articleId;
  private double recentMarketPrice;
  private boolean availability;
}
