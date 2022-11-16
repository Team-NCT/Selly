package com.nct.sellyarticleservice.domain.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseInfoArticle {
  private String tokenId;
  private String ownershipContractAddress;
  private String metaDataUrl;
  private String articleImgUrl;
  private String contractAddress;
  private Integer primaryCnt;
}
