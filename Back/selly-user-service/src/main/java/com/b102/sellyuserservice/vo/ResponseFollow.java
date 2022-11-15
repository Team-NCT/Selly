package com.b102.sellyuserservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseFollow {
  private String code;
  private String message;
  private Long followerId;
  private Long followingId;

}
