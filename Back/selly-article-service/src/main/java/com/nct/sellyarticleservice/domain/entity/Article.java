package com.nct.sellyarticleservice.domain.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@NoArgsConstructor
@Entity
@EntityListeners(value= AuditingEntityListener.class)
public class  Article {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long articleId;

  @Column(nullable = false, columnDefinition = "TINYINT", length=1)
  private boolean availability;

  private String category;

  private String articleName;

  private String articleImgUrl;

  private String articleIntroduction;

  private String connectionLink;

  private String attribute;

  private String metaDataUrl;
  @CreatedDate
  private LocalDateTime registTime;

  private String contractAddress;

  private LocalDateTime createRegist;

  private LocalDateTime updateRegist;

  private Long originalAuthor;

  private Integer primaryCnt;

  private Integer currentCnt;

  private Double price;

  private Long owner;

  private String tokenId;

  private boolean auction;

  private boolean status;

  private double recentMarketPrice;

  private String ownershipContractAddress;

  @Builder
  public Article(Long articleId, String contractAddress, boolean availability, String category, String articleName, String articleImgUrl, String articleIntroduction, String connectionLink, String attribute, String metaDataUrl, LocalDateTime registTime, LocalDateTime createRegist, LocalDateTime updateRegist, Long originalAuthor, Integer primaryCnt, Integer currentCnt, Double price, Long owner, String tokenId, boolean auction, boolean status) {
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
    this.tokenId = tokenId;
    this.auction = auction;
    this.status = status;
  }

  public void updateArticle(boolean availability, LocalDateTime createRegist) {

    this.availability = availability;
    this.createRegist = createRegist;
  }
}