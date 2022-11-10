package com.nct.sellyarticleservice.domain.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ArticleResponse {

  private Long articleId;

  private boolean availability;

  private String category;

  private String articleName;

  private String articleImgUrl;

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

  private double recentMarketPrice;

  @Builder
  public ArticleResponse(Long articleId, boolean availability, String category, String articleName,
                         String articleImgUrl, String connectionLink, String attribute, String metaDataUrl,
                         LocalDateTime registTime, LocalDateTime createRegist, LocalDateTime updateRegist,
                         Long originalAuthor, Integer primaryCnt, Integer currentCnt, Double price, Long owner,
                         double recentMarketPrice) {
    this.articleId = articleId;
    this.availability = availability;
    this.category = category;
    this.articleName = articleName;
    this.articleImgUrl = articleImgUrl;
    this.connectionLink = connectionLink;
    this.attribute = attribute;
    this.metaDataUrl = metaDataUrl;
    this.registTime = registTime;
    this.createRegist = createRegist;
    this.updateRegist = updateRegist;
    this.originalAuthor = originalAuthor;
    this.primaryCnt = primaryCnt;
    this.currentCnt = currentCnt;
    this.price = price;
    this.owner = owner;
    this.recentMarketPrice = recentMarketPrice;
  }

}
