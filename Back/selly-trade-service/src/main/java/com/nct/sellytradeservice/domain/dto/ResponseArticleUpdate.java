package com.nct.sellytradeservice.domain.dto;

import lombok.Data;

@Data
public class ResponseArticleUpdate {
  private Long articleId;
  private double recentMarketPrice;
  private boolean availability;
}
