package com.nct.sellyarticleservice.domain.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class ResponseArticleNoMinting {

  private Long owner;

  private String metaDataUrl;

  private String articleName;

  private String articleImgUrl;

  private String wallet;

  private String contractAddress;
}
