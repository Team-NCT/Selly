package com.b102.sellyuserservice.vo;


import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
public class RequestUser {
  @NotNull(message = "Wallet can't be null")
  @Pattern(regexp="[a-zA-Z1-9]{4,150}", message = "아이디는 특수문자, 한글을 제외한 4~150자리여야 합니다.")
  private String wallet;
  @NotNull(message = "Password can't be null")
  private String pwd;
  @NotNull(message = "image can't be null")
  private String image;
  @NotNull(message = "banner can't be null")
  private String banner;
}
