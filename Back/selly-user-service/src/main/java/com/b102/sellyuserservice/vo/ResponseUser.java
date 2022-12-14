package com.b102.sellyuserservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseUser {
  private Long userId;
  private String wallet;
  private String nickname;
  private String image;
  private String banner;
  private String introduction;
  private Long followerCnt;
  private Long followingCnt;
  private boolean myFollowing;
  private boolean certification;
}

