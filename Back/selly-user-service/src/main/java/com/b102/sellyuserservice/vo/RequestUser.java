package com.b102.sellyuserservice.vo;


import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class RequestUser {
  @NotNull(message = "Wallet can't be null")
  private String wallet;
  @NotNull(message = "Password can't be null")
  private String pwd;
  @NotNull(message = "image can't be null")
  private String image;
  @NotNull(message = "banner can't be null")
  private String banner;
}
