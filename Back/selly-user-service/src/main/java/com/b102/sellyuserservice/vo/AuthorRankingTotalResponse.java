package com.b102.sellyuserservice.vo;

import lombok.Data;

@Data
public class AuthorRankingTotalResponse {
  private Long userId;
  private String nickname;
  private String image;
  private String wallet;
  private Integer followerCnt;
  private Integer nftCnt;
  private boolean certification;
  private Integer tradeCount;
}
