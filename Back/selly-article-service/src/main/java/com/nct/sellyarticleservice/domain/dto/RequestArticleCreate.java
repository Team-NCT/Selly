package com.nct.sellyarticleservice.domain.dto;


import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class RequestArticleCreate {
  @NotNull(message = "owner can't be null")
  private Long owner;
  @NotNull(message = "metaDataUrl can't be null")
  private String metaDataUrl;
  @NotNull(message = "articleName can't be null")
  private String articleName;
  @NotNull(message = "articleImgUrl can't be null")
  private String articleImgUrl;
  @NotNull(message = "wallet can't be null")
  private String wallet;
}
