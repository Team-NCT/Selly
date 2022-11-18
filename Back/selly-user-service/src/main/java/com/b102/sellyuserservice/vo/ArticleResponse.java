package com.b102.sellyuserservice.vo;

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
public class ArticleResponse {
  private Long articleId;
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
  private String ownerImg;
  private String ownerNickname;
  private Boolean certification;
  private Boolean bookMark;
  private Double recentMarketPrice;
}
