package com.b102.sellyuserservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;

import java.time.LocalDateTime;
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BookMarkResponse {
  private Long userId;
  private Long articleId;
  private LocalDateTime bookMarkRegistTime;
}
