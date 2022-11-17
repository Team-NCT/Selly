package com.nct.sellyarticleservice.domain.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseArticle {

  private Long articleId;
  private String category;
  private String articleName;
  private String articleImgUrl;
  private String metaDataUrl;
  private Date registTime;
  private String contractAddress;
  private Date createRegist;
  private Date updateRegist;
  private Integer primaryCnt;
  private Integer currentCnt;
  private Double price;
  private Long owner;
  private String tokenId;
  private String ownerImg;
  private String ownerNickname;
  private boolean certification;
  private boolean bookMark;
  private boolean availability;
  private Double recentMarketPrice;
}
