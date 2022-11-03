package com.nct.sellysearchservice.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SearchUserResponse {
  private Long userId;
  private String nickname;
  private String image;
  private boolean certification;
}