package com.b102.sellyuserservice.vo;

import lombok.Data;

@Data
public class ResponseFollowerUser {
  private Long userId;
  private String wallet;
  private String image;
  private String nickname;
}
