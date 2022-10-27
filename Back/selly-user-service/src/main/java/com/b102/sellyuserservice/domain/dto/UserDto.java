package com.b102.sellyuserservice.domain.dto;

import lombok.Data;

import java.util.Date;

@Data
public class UserDto {
  private String wallet;
  private String image;
  private String banner;
  private String userId;
  private String introduction;
  private String nickname;
  private Date createRegist;
  private Date updateRegist;
}
