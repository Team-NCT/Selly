package com.nct.sellyarticleservice.domain.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RequestAuctionBid {
  private Long auctionId;
  private Long articleId;
  private Long buyer;
  private double price;


}
