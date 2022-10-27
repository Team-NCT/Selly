package com.nct.sellyarticleservice.domain.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Article {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
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

  @Builder
  public Article(Long articleId, String hashData, boolean availability, String category, String articleName, String articleImgUrl, String articleIntroduction, String connectionLink, String attribute, String metaDataUrl, Date registTime, Date createRegist, Date updateRegist, Long originalAuthor, Integer primaryCnt, Integer currentCnt, Double price, Long owner) {
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
    this.hashData = hashData;
    this.originalAuthor = originalAuthor;
    this.primaryCnt = primaryCnt;
    this.currentCnt = currentCnt;
    this.price = price;
    this.owner = owner;
  }
}