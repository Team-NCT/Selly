package com.nct.sellytradeservice.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ArticleResponse {

  private Long articleId;

  private boolean availability;

  private String category;

  private String articleName;

  private String articleImgUrl;

  private String articleIntroduction;

  private String connectionLink;

  private String attribute;

  private String metaDataUrl;

  private Date registTime;

  private String hashData;

  private Date createRegist;

  private Date updateRegist;

  private Long originalAuthor;

  private Integer primaryCnt;

  private Integer currentCnt;

  private Double price;

  private Long owner;
}
