package com.b102.sellyuserservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseFollowingUser {
  private Long userId;
  private String wallet;
  private String image;
  private String nickname;
  private boolean myFollower;
}
