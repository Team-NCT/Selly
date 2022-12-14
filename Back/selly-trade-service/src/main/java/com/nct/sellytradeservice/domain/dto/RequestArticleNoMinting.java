package com.nct.sellytradeservice.domain.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class RequestArticleNoMinting {
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
