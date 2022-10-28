package com.b102.sellyuserservice.vo;

import com.sun.istack.NotNull;
import lombok.Data;

@Data
public class RequestUser {
  @NotNull
  private String wallet;
  @NotNull
  private String image;
  @NotNull
  private String banner;
}
