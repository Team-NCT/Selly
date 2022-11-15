package com.b102.sellyuserservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

//@Getter
//@RequiredArgsConstructor
//@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SearchUserResponse {
  private Long userId;
  private String nickname;
  private String image;
  private boolean certification;
}
