package com.nct.sellytradeservice.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
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

  private Date registTime;

  private String contractAddress;

  private Date createRegist;

  private Date updateRegist;

  private Long originalAuthor;

  private Integer primaryCnt;

  private Integer currentCnt;

  private Double price;

  private Long owner;

  @Builder
  public ArticleRequest(Long articleId, String contractAddress, boolean availability, String category, String articleName, String articleImgUrl, String articleIntroduction, String connectionLink, String attribute, String metaDataUrl, Date registTime, Date createRegist, Date updateRegist, Long originalAuthor, Integer primaryCnt, Integer currentCnt, Double price, Long owner) {
    this.articleId = articleId;
    this.availability = availability;
    this.category = category;
    this.articleName = articleName;
    this.articleImgUrl = articleImgUrl;
    this.articleIntroduction = articleIntroduction;
    this.connectionLink = connectionLink;
    this.attribute = attribute;
    this.metaDataUrl = metaDataUrl;
    this.registTime = registTime;
    this.createRegist = createRegist;
    this.updateRegist = updateRegist;
    this.contractAddress = contractAddress;
    this.originalAuthor = originalAuthor;
    this.primaryCnt = primaryCnt;
    this.currentCnt = currentCnt;
    this.price = price;
    this.owner = owner;
  }

  public Article toEntity() {
    return Article.builder()
            .articleId(articleId)
            .availability(isAvailability())
            .category(category)
            .articleName(articleName)
            .articleImgUrl(articleImgUrl)
            .articleIntroduction(articleIntroduction)
            .connectionLink(connectionLink)
            .attribute(attribute)
            .metaDataUrl(metaDataUrl)
            .registTime(registTime)
            .createRegist(createRegist)
            .updateRegist(updateRegist)
            .contractAddress(contractAddress)
            .originalAuthor(originalAuthor)
            .primaryCnt(primaryCnt)
            .currentCnt(currentCnt)
            .price(price)
            .owner(owner)
            .build();
  }

}
