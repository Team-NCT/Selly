package com.nct.Selly.domain.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
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

  private String articleUrl;

  private String articleIntroduction;

  private String connectionLink;

  private String attribute;

  private String metaDataUrl;

  private Date registTime;

  private Date createRegist;

  private Date updateRegist;

  @ManyToOne
  private Users owner;

  @Builder
  public Article(Long articleId, boolean availability, String category, String articleName, String articleUrl, String articleIntroduction, String connectionLink, String attribute, String metaDataUrl, Date registTime, Date createRegist, Date updateRegist, Users owner) {
    this.articleId = articleId;
    this.availability = availability;
    this.category = category;
    this.articleName = articleName;
    this.articleUrl = articleUrl;
    this.articleIntroduction = articleIntroduction;
    this.connectionLink = connectionLink;
    this.attribute = attribute;
    this.metaDataUrl = metaDataUrl;
    this.registTime = registTime;
    this.createRegist = createRegist;
    this.updateRegist = updateRegist;
    this.owner = owner;
  }
}
