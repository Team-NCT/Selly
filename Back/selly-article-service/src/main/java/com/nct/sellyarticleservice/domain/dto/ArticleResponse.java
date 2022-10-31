package com.nct.sellyarticleservice.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
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

  private LocalDateTime registTime;

  private String hashData;

  private LocalDateTime createRegist;

  private LocalDateTime updateRegist;

  private Long originalAuthor;

  private Integer primaryCnt;

  private Integer currentCnt;

  private Double price;

  private Long owner;
}
