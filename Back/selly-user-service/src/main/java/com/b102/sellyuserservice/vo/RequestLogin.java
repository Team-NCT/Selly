package com.b102.sellyuserservice.vo;


import lombok.Data;

import javax.validation.constraints.NotNull;


@Data
public class RequestLogin {
  @NotNull(message = "Wallet can't be null")
  private String wallet;
}
