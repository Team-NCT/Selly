package com.nct.sellytradeservice.domain.dto;

import lombok.Data;

@Data
public class RequestArticleNoMinting {
  private Long owner;
  private String metaDataUrl;
  private String articleName;
  private String articleImgUrl;
  private String wallet;
}
