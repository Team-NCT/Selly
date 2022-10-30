package com.nct.sellytradeservice.model.service;

import com.nct.sellytradeservice.domain.dto.ArticleResponse;
import com.nct.sellytradeservice.domain.dto.ArticleResponseDto;
import com.nct.sellytradeservice.domain.dto.ArticleUpdateRequest;

public interface TradeService {
  String registArticleSell(Long id, ArticleUpdateRequest articleUpdateRequest);

  ArticleResponseDto findById(Long id);
}
