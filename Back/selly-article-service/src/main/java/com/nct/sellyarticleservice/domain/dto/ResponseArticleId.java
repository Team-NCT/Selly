package com.nct.sellyarticleservice.domain.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseArticleId {
  private Long articleId;
}
