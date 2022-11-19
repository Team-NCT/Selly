package com.b102.sellyuserservice.model.service;

import com.b102.sellyuserservice.client.ArticleServiceClient;
import com.b102.sellyuserservice.client.TradeServiceClient;
import com.b102.sellyuserservice.controller.ProfileController;
import com.b102.sellyuserservice.domain.entity.NftPiece;
import com.b102.sellyuserservice.model.repository.NftPieceRepository;
import com.b102.sellyuserservice.vo.ArticleResponse;
import com.b102.sellyuserservice.vo.FractionResponse;
import com.b102.sellyuserservice.vo.MarginResponse;
import com.b102.sellyuserservice.vo.TradeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ProfileServiceImpl implements ProfileService{

  private final ArticleServiceClient articleServiceClient;
  private final TradeServiceClient tradeServiceClient;
  private final NftPieceRepository nftPieceRepository;
  private Double rateChange;

  @Override
  public List<ArticleResponse> findUserCreatedArticleList(Long userId) {
    List<ArticleResponse> articleResponseList = articleServiceClient.searchByOwner(userId);
    List<ArticleResponse> responses = new ArrayList<>();
    // Client에서 요구하는 값들만을 보내주기 위해 Builder 사용
    articleResponseList.forEach( v -> {
      ArticleResponse articleResponse = ArticleResponse.builder()
              .articleId(v.getArticleId())
              .articleImgUrl(v.getArticleImgUrl())
              .articleName(v.getArticleName())
              .build();
      responses.add(articleResponse);
    });
    return responses;
  }

  @Override
  public List<ArticleResponse> findUserSaleArticleList(Long userId) {
    List<ArticleResponse> articleResponseList = new ArrayList<>();
    List<TradeResponse> tradeResponseList = tradeServiceClient.getTradeRegist(userId);
    tradeResponseList.forEach( v-> {
      ArticleResponse articleResponse = articleServiceClient.getArticleForProfile(v.getArticleId());
      ArticleResponse response = ArticleResponse.builder()
              .articleId(articleResponse.getArticleId())
              .articleImgUrl(articleResponse.getArticleImgUrl())
              .articleName(articleResponse.getArticleName())
              .build();
      articleResponseList.add(response);
    });
    return articleResponseList;
  }

//  @Override
//  public List<FractionResponse> getFraction(Long userId, Long profileUserId) {
//    List<FractionResponse> responses = new ArrayList<>();
//    if (Objects.equals(userId, profileUserId)) {
//      List<NftPiece> articleResponseList = nftPieceRepository.findByUserId(profileUserId);
//      articleResponseList.forEach( v -> {
//        Optional<NftPiece> optionalNftPiece = nftPieceRepository.findByUserIdAndArticleId(profileUserId, v.getArticleId());
//        if (optionalNftPiece.isPresent()) {
//          NftPiece nftPiece = optionalNftPiece.get();
//          ArticleResponse articleResponse = articleServiceClient.getArticleForProfile(v.getArticleId());
//          if (articleResponse.getOwner() == profileUserId)
//            continue;
//
//          if((articleResponse.getRecentMarketPrice() - nftPiece.getAvgPrice())== 0){
//            rateChange = 0.0;
//          } else {
//            rateChange = ((articleResponse.getRecentMarketPrice() - nftPiece.getAvgPrice()) / nftPiece.getAvgPrice()) * 100;
//          }
//          FractionResponse fractionResponse = FractionResponse.builder()
//                  .articleId(v.getArticleId())
//                  .articleName(articleResponse.getArticleName())
//                  .articleImgUrl(articleResponse.getArticleImgUrl())
//                  .recentMarketPrice(articleResponse.getRecentMarketPrice())
//                  .pieceCnt(nftPiece.getNftPieceCnt())
//                  .rateChange(this.rateChange)
//                  .build();
//          responses.add(fractionResponse);
//        }
//      });
//      return responses;
//    }
//    List<NftPiece> articleResponseList = nftPieceRepository.findByUserId(profileUserId);
//
//    articleResponseList.forEach( v -> {
//      ArticleResponse articleResponse = articleServiceClient.getArticle(v.getArticleId());
//      FractionResponse fractionResponse = FractionResponse.builder()
//              .articleId(v.getArticleId())
//              .articleName(articleResponse.getArticleName())
//              .articleImgUrl(articleResponse.getArticleImgUrl())
//              .recentMarketPrice(articleResponse.getRecentMarketPrice())
//              .build();
//      responses.add(fractionResponse);
//    });
//    return responses;
//  }

  @Override
  public MarginResponse getMargin(Long userId) {
    // 총 구매가 구하기
    // 전체 조각소유주 리스트 중 내 NFT 조각 리스트 가져오기
    List<NftPiece> articleResponseList = nftPieceRepository.findByUserId(userId);
    List<Long> longList = new ArrayList<>();
    List<ArticleResponse> articleResponseList1 = articleServiceClient.getArticleList(longList);
    articleResponseList.forEach( v -> {
      longList.add(v.getArticleId());
    });
    double totalPurchasePrice = 0;
    for (NftPiece i : articleResponseList) {
      ArticleResponse articleResponse = articleServiceClient.getArticle(i.getArticleId());
      if (Objects.equals(articleResponse.getOwner(), userId))
        continue;
      totalPurchasePrice += (i.getAvgPrice() * i.getNftPieceCnt());
    }
    double totalAssetValue = 0.0;
    for (ArticleResponse articleResponse : articleResponseList1) {
      if (Objects.equals(articleResponse.getOwner(), userId))
        continue;
      Optional<NftPiece> optionalNftPiece = nftPieceRepository.findByUserIdAndArticleId(userId, articleResponse.getArticleId());
      if (optionalNftPiece.isPresent()) {
        System.out.println("총 자산가치 더하기 전");
        NftPiece nftPiece = optionalNftPiece.get();
        System.out.println(totalAssetValue);
        totalAssetValue += (articleResponse.getRecentMarketPrice() * nftPiece.getNftPieceCnt());
        System.out.println("총 자산가치 더한 후");
        System.out.println(totalAssetValue);
      }
    }
    System.out.println("총 자산가치 확인");
    System.out.println(totalAssetValue);
    if(totalAssetValue-totalPurchasePrice == 0) {
      rateChange = 0.0;
    } else {
      rateChange = ((totalAssetValue-totalPurchasePrice) / totalPurchasePrice) * 100;
    }
    return MarginResponse.builder()
            .marginRate(((totalAssetValue-totalPurchasePrice) / totalPurchasePrice) * 100)
            .totalAssetValue(totalAssetValue)
            .margin(totalAssetValue - totalPurchasePrice)
            .principal(totalPurchasePrice)
            .build();
  }
  @Override
  public List<FractionResponse> getFraction(Long userId, Long profileUserId) {
    List<FractionResponse> responses = new ArrayList<>();
    if (Objects.equals(userId, profileUserId)) {
      List<NftPiece> articleResponseList = nftPieceRepository.findByUserId(profileUserId);
      for (NftPiece v : articleResponseList ) {
        Optional<NftPiece> optionalNftPiece = nftPieceRepository.findByUserIdAndArticleId(profileUserId, v.getArticleId());
        if (optionalNftPiece.isPresent()) {
          NftPiece nftPiece = optionalNftPiece.get();
          ArticleResponse articleResponse = articleServiceClient.getArticleForProfile(v.getArticleId());
          if (Objects.equals(articleResponse.getOwner(), profileUserId))
            continue;
          if((articleResponse.getRecentMarketPrice() - nftPiece.getAvgPrice())== 0){
            rateChange = 0.0;
          } else {
            rateChange = ((articleResponse.getRecentMarketPrice() - nftPiece.getAvgPrice()) / nftPiece.getAvgPrice()) * 100;
          }
          FractionResponse fractionResponse = FractionResponse.builder()
                  .articleId(v.getArticleId())
                  .articleName(articleResponse.getArticleName())
                  .articleImgUrl(articleResponse.getArticleImgUrl())
                  .recentMarketPrice(articleResponse.getRecentMarketPrice())
                  .pieceCnt(nftPiece.getNftPieceCnt())
                  .rateChange(this.rateChange)
                  .build();
          responses.add(fractionResponse);
        } else {
          return new ArrayList<>();
        }
      }
      return responses;
    }
    List<NftPiece> articleResponseList = nftPieceRepository.findByUserId(profileUserId);

    articleResponseList.forEach( v -> {
      ArticleResponse articleResponse = articleServiceClient.getArticle(v.getArticleId());
      FractionResponse fractionResponse = FractionResponse.builder()
              .articleId(v.getArticleId())
              .articleName(articleResponse.getArticleName())
              .articleImgUrl(articleResponse.getArticleImgUrl())
              .recentMarketPrice(articleResponse.getRecentMarketPrice())
              .build();
      responses.add(fractionResponse);
    });
    return responses;
  }
}
