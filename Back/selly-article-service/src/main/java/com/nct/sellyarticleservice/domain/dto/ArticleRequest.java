package com.nct.sellyarticleservice.domain.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.nct.sellyarticleservice.domain.entity.Article;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ArticleRequest {

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

  private String contractAddress;

  private LocalDateTime createRegist;

  private LocalDateTime updateRegist;

  private Long originalAuthor;

  private Integer primaryCnt;

  private Integer currentCnt;

  private Double price;

  private Long owner;

//  @Builder
//  public ArticleRequest(Long articleId, String contractAddress, boolean availability, String category, String articleName, String articleImgUrl, String articleIntroduction, String connectionLink, String attribute, String metaDataUrl, LocalDateTime registTime, LocalDateTime createRegist, LocalDateTime updateRegist, Long originalAuthor, Integer primaryCnt, Integer currentCnt, Double price, Long owner) {
//    this.articleId = articleId;
//    this.availability = availability;
//    this.category = category;
//    this.articleName = articleName;
//    this.articleImgUrl = articleImgUrl;
//    this.articleIntroduction = articleIntroduction;
//    this.connectionLink = connectionLink;
//    this.attribute = attribute;
//    this.metaDataUrl = metaDataUrl;
//    this.registTime = registTime;
//    this.createRegist = createRegist;
//    this.updateRegist = updateRegist;
//    this.contractAddress = contractAddress;
//    this.originalAuthor = originalAuthor;
//    this.primaryCnt = primaryCnt;
//    this.currentCnt = currentCnt;
//    this.price = price;
//    this.owner = owner;
//  }

//  public Article toEntity() {
//    return Article.builder()
//            .articleId(articleId)
//            .availability(isAvailability())
//            .category(category)
//            .articleName(articleName)
//            .articleImgUrl(articleImgUrl)
//            .articleIntroduction(articleIntroduction)
//            .connectionLink(connectionLink)
//            .attribute(attribute)
//            .metaDataUrl(metaDataUrl)
//            .registTime(registTime)
//            .createRegist(createRegist)
//            .updateRegist(updateRegist)
//            .contractAddress(contractAddress)
//            .originalAuthor(originalAuthor)
//            .primaryCnt(primaryCnt)
//            .currentCnt(currentCnt)
//            .price(price)
//            .owner(owner)
//            .build();
//  }
}
