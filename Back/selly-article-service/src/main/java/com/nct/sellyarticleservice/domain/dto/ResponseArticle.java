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

  private boolean availability;

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
