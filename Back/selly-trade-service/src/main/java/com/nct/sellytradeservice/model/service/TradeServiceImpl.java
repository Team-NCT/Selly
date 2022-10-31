package com.nct.sellytradeservice.model.service;

import com.nct.sellytradeservice.client.ArticleServiceClient;
import com.nct.sellytradeservice.domain.dto.ArticleResponseDto;
import com.nct.sellytradeservice.domain.dto.ArticleUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class TradeServiceImpl implements TradeService {

  private final ArticleServiceClient articleServiceClient;
  @Override
  public String registArticleSell(Long id, ArticleUpdateRequest articleUpdateRequest){
    ArticleUpdateRequest.builder()
                    .createRegist(LocalDateTime.now());
    articleServiceClient.sellRegist(articleUpdateRequest, id);

    return new String("asdf");
  }

  @Override
  public ArticleResponseDto findById(Long id) {
    return articleServiceClient.articleResponse(id);
  }
}
