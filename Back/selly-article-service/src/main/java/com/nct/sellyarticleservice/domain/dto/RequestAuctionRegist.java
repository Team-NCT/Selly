package com.nct.sellyarticleservice.domain.dto;

import lombok.Data;

@Data
public class RequestAuctionRegist {
  private Long articleId;
  private double lowPrice;
}
