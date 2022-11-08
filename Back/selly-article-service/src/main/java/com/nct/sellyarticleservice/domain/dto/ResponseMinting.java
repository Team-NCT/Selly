package com.nct.sellyarticleservice.domain.dto;

import lombok.Data;

@Data
public class ResponseMinting {
  private long userId;
  private Integer nonce;
  private String from;
  private String to;
  private String data;
}
