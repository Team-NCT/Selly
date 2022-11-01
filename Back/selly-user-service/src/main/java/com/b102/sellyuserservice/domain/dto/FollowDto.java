package com.b102.sellyuserservice.domain.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FollowDto {
  private Long followerId;
  private Long followingId;
  private LocalDateTime createRegist;
  private LocalDateTime updateRegist;
}
