package com.nct.sellysearchservice.model.service;

import com.nct.sellysearchservice.client.ArticleServiceClient;
import com.nct.sellysearchservice.client.TradeServiceClient;
import com.nct.sellysearchservice.client.UserServiceClient;
import com.nct.sellysearchservice.domain.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.*;

@RequiredArgsConstructor
@Service
public class SearchServiceImpl implements SearchService{

  private final ArticleServiceClient articleServiceClient;
  private final TradeServiceClient tradeServiceClient;
  private final UserServiceClient userServiceClient;
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

  @Override
  public HashMap<String, Object> getSearchResult(String keyword) {
    List<ArticleResponse> articleResponseList = articleServiceClient.articleSearchResponse(keyword);
    List<SearchUserResponse> userResponseList = userServiceClient.userSearchResponse(keyword);
    HashMap<String, Object> result = new HashMap<>();
    userResponseList.forEach(v->{
      if(v.getImage() != null){
        byte[] imageDecode = Base64.getDecoder().decode(v.getImage());
        v.setImage(new String(imageDecode, StandardCharsets.UTF_8));
      }else if (v.getImage() == null){
        v.setImage("default");
      }
    });

    result.put("user", userResponseList);
    result.put("article", articleResponseList);
    return result;
  }
}
