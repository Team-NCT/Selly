package com.b102.sellyuserservice.domain.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class UserDto {
  private String wallet;
  private String pwd;
  private String decryptedPwd;
  private String encryptedPwd;
  private String image;
  private String banner;
  private String userId;
  private String introduction;
  private String nickname;
  private LocalDateTime createRegist;
  private LocalDateTime updateRegist;
}
