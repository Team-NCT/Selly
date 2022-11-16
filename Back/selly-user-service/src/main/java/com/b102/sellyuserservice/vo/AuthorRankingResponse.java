package com.b102.sellyuserservice.vo;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
public class AuthorRankingResponse {
  private Long userId;
  private String nickname;
  private String image;
  private String wallet;
  private Integer followerCnt;
  private Integer nftCnt;
  private boolean certification;

}
