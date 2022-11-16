package com.nct.sellyarticleservice.domain.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseInfoUser {
  private Long userId;
  private String nickname;
  private String image;
  private boolean certification;
}
