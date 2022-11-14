package com.b102.sellyuserservice.vo;

import lombok.Builder;
import lombok.Getter;

@Getter
public class AuthorRankingResponse {
  private Long userId;
  private String nickname;
  private String image;
  private String wallet;
  private Integer followerCnt;
  private Integer nftCnt;
  private boolean certification;

  @Builder
  public AuthorRankingResponse (Long userId, String nickname, String image, String wallet, Integer followerCnt, Integer nftCnt, boolean certification) {
    this.userId = userId;
    this.nickname = nickname;
    this.image = image;
    this.wallet = wallet;
    this.followerCnt = followerCnt;
    this.nftCnt = nftCnt;
    this.certification = certification;
  }
}
