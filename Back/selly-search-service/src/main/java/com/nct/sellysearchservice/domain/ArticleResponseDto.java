package com.nct.sellysearchservice.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ArticleResponseDto {
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

  private String contractAddress;

  private Date createRegist;

  private Date updateRegist;

  private Long originalAuthor;

  private Integer primaryCnt;

  private Integer currentCnt;

  private Double price;

  private Long owner;

  private String tokenId;

  private boolean auction;
//
//  public ArticleResponseDto(Article entity) {
//    this.articleId = entity.getArticleId();
//    this.availability = entity.isAvailability();
//    this.category = entity.getCategory();
//    this.articleName = entity.getArticleName();
//    this.articleImgUrl = entity.getArticleImgUrl();
//    this.articleIntroduction = entity.getArticleIntroduction();
//    this.connectionLink = entity.getConnectionLink();
//    this.attribute = entity.getAttribute();
//    this.metaDataUrl = entity.getMetaDataUrl();
//    this.registTime = entity.getRegistTime();
//    this.createRegist = entity.getCreateRegist();
//    this.updateRegist = entity.getUpdateRegist();
//    this.hashData = entity.getHashData();
//    this.originalAuthor = entity.getOriginalAuthor();
//    this.primaryCnt = entity.getPrimaryCnt();
//    this.currentCnt = entity.getCurrentCnt();
//    this.price = entity.getPrice();
//    this.owner = entity.getOwner();
//  }
//
//  public static ArticleResponseDto builder() {
//  }
}
