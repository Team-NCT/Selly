package com.nct.sellyarticleservice.domain.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name = "article")@EntityListeners(value= AuditingEntityListener.class)
public class  Article {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long articleId;

  @Column(nullable = false, columnDefinition = "TINYINT", length=1)
  private boolean availability;

  private String category;

  private String articleName;

  private String articleImgUrl;

  @Column(nullable = false, length = 200)
  private String metaDataUrl;

  @CreatedDate
  private LocalDateTime registTime;

  private String contractAddress;

  @Column(updatable = false)
  @CreatedDate
  private LocalDateTime createRegist;

  @LastModifiedDate
  private LocalDateTime updateRegist;

  private Integer primaryCnt;

  private Integer currentCnt;

  private Double price;

  private Long owner;

  private String tokenId;

  private boolean auction;

  private boolean status;

  private double recentMarketPrice;

  private String ownershipContractAddress;

  private Long originalAuthor;

//  @Builder
//  public Article(Long articleId, String contractAddress, boolean availability, String category, String articleName, String articleImgUrl, String articleIntroduction, String connectionLink, String attribute, String metaDataUrl, LocalDateTime registTime, LocalDateTime createRegist, LocalDateTime updateRegist, Long originalAuthor, Integer primaryCnt, Integer currentCnt, Double price, Long owner, String tokenId, boolean auction, boolean status) {
//    this.articleId = articleId;
//    this.availability = availability;
//    this.category = category;
//    this.articleName = articleName;
//    this.articleImgUrl = articleImgUrl;
//    this.metaDataUrl = metaDataUrl;
//    this.registTime = registTime;
//    this.createRegist = createRegist;
//    this.updateRegist = updateRegist;
//    this.contractAddress = contractAddress;
//    this.primaryCnt = primaryCnt;
//    this.currentCnt = currentCnt;
//    this.price = price;
//    this.owner = owner;
//    this.tokenId = tokenId;
//    this.auction = auction;
//    this.status = status;
//  }
//
  public void updateArticle(boolean availability, LocalDateTime createRegist, double price, String ownershipContractAddress, Integer primaryCnt, String category) {

    this.availability = availability;
    this.createRegist = createRegist;
    this.price = price;
    this.ownershipContractAddress = ownershipContractAddress;
    this.primaryCnt = primaryCnt;
    this.category = category;
  }
}