package com.b102.sellyuserservice.vo;

import lombok.Data;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Data
public class RequestFollow {
  @NotNull(message = "followerId can't be null")
  private Long followerId;

  @NotNull(message = "following can't be null")
  private Long followingId;
}
