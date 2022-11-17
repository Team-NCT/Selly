package com.b102.sellyuserservice.model.service;

import com.b102.sellyuserservice.client.ArticleServiceClient;
import com.b102.sellyuserservice.controller.ProfileController;
import com.b102.sellyuserservice.domain.entity.NftPiece;
import com.b102.sellyuserservice.model.repository.NftPieceRepository;
import com.b102.sellyuserservice.vo.ArticleResponse;
import com.b102.sellyuserservice.vo.FractionResponse;
import com.b102.sellyuserservice.vo.MarginResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ProfileServiceImpl implements ProfileService{

  private final ArticleServiceClient articleServiceClient;
  private final NftPieceRepository nftPieceRepository;
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
    return null;
  }

  @Override
  public List<FractionResponse> getFraction(Long userId, Long profileUserId) {
    List<FractionResponse> responses = new ArrayList<>();
    if (userId == profileUserId) {
//    if (userId.equals(profileUserId)) {
      List<NftPiece> articleResponseList = nftPieceRepository.findByUserId(profileUserId);
      articleResponseList.forEach( v -> {
        NftPiece nftPiece = nftPieceRepository.findByArticleId(v.getArticleId());
        ArticleResponse articleResponse = articleServiceClient.getArticle(v.getArticleId());
        FractionResponse fractionResponse = FractionResponse.builder()
                .articleId(v.getArticleId())
                .articleName(articleResponse.getArticleName())
                .articleImgUrl(articleResponse.getArticleImgUrl())
                .recentMarketPrice(articleResponse.getRecentMarketPrice())
                .pieceCnt(nftPiece.getNftPieceCnt())
                .rateChange((articleResponse.getRecentMarketPrice()/ nftPiece.getAvgPrice()) * 100)
                .build();
        responses.add(fractionResponse);
      });
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

  @Override
  public MarginResponse getMargin(Long userId) {
    // 총 구매가 구하기
    List<NftPiece> articleResponseList = nftPieceRepository.findByUserId(userId);
//    double totalPurchasePrice = articleResponseList.stream().mapToDouble(Double::doubleValue).sum();
    double totalPurchasePrice = articleResponseList.stream().mapToDouble(value -> value.getNftPieceCnt() * value.getNftPieceCnt()).sum();
    List<Long> longList = new ArrayList<>();
    articleResponseList.forEach( v -> {
      longList.add(v.getArticleId());
    });
    double totalAssetValue = 0;
    List<ArticleResponse> articleResponseList1 = articleServiceClient.getArticleList(longList);
    for (ArticleResponse articleResponse : articleResponseList1) {
      NftPiece nftPiece = nftPieceRepository.findByArticleId(articleResponse.getArticleId());
      totalAssetValue += articleResponse.getRecentMarketPrice() * nftPiece.getNftPieceCnt();
    }

//    double totalRecentTradePrice =
//    for (NftPiece i : articleResponseList) {
//        totalPurchasePrice += (i.getAvgPrice() * i.getNftPieceCnt());
//    }
    //    ArrayList<Double> a = new ArrayList<>();
//    a.add(3.4);
//    a.add(3.6);
//    double b = a.stream().mapToDouble(Double::doubleValue).sum();
//    System.out.println(b);
//    articleResponseList.forEach( v -> {
//      totalPurchasePrice += (v.getAvgPrice() * v.getNftPieceCnt());
//    });
//    double marginRate;
//    if (totalAssetValue >= totalPurchasePrice) {
//      marginRate =
//    }
    return MarginResponse.builder()
            .marginRate(((totalAssetValue-totalPurchasePrice) / totalPurchasePrice) * 100)
            .totalAssetValue(totalAssetValue)
            .margin(totalAssetValue - totalPurchasePrice)
            .principal(totalPurchasePrice)
            .build();
  }
}
