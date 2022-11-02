package com.nct.sellysearchservice.model.service;

import com.nct.sellysearchservice.client.ArticleServiceClient;
import com.nct.sellysearchservice.client.TradeServiceClient;
import com.nct.sellysearchservice.domain.ArticleResponseDto;
import com.nct.sellysearchservice.domain.TradeResponse;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
@RequiredArgsConstructor
public class SearchServiceImpl {

  private final ArticleServiceClient articleServiceClient;
  private final TradeServiceClient tradeServiceClient;
  public List<Object> filter(String sell, String auction) {
    List<ArticleResponseDto> articleResponseDtoList = articleServiceClient.articleResponse(sell);
    List<TradeResponse> tradeLogResponseList = tradeServiceClient.tradeResponse(sell);
    List<ArticleResponseDto> articleAuctionResponseDtoList = articleServiceClient.articleAuctionResponse(auction);
    HashSet<Long> set = new HashSet<>(
    );
    articleResponseDtoList.forEach( v->
            set.add(v.getArticleId()));
    articleAuctionResponseDtoList.forEach( v ->
            set.add(v.getArticleId()));
    tradeLogResponseList.forEach( v ->
            set.add(v.getArticleId()));

    List<Long> articleIdList = new ArrayList<Long>(set);



//    List<Long> articleList = new ArrayList<>();
//    switch (auction) {
//      case "selling":
//        articleResponseDtoList.forEach(v -> {
//          if(v.isAuction()) {
//            articleList.add(v.getArticleId());
//          }
//        });
//        switch (sell) {
//          case "ing":
//            if()
//            break;
//          case "end":
//            break;
//          default:
//
//            break;
//        }
//        break;
//      case "end":
//        switch (sell) {
//          case "ing":
//            break;
//          case "end":
//            break;
//          default:
//            break;
//        }
//        break;
//      default:
//        break;
//    }
    return null;
  }
}
