package com.nct.sellyarticleservice.domain.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RequestNoMinting {
  private Long owner;
  private String metaDataUrl;
  private String articleName;
  private String articleImgUrl;
  private String wallet;
  private String contractAddress;
  private String ownershipContractAddress;
  private String tokenId;
  private Integer primaryCnt;
  private String category;
  private Long originalAuthor;
}
