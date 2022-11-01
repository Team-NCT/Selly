package com.b102.sellyuserservice.vo;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class RequestUpdate {
  @NotNull(message = "image can't be null")
  private String image;
  @NotNull(message = "banner can't be null")
  private String banner;
  @NotNull(message = "nickname can't be null")
  private String nickname;
  @NotNull(message = "introduction can't be null")
  private String introduction;
}
