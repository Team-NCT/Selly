package com.b102.sellyuserservice.model.service;

import com.b102.sellyuserservice.client.ArticleServiceClient;
import com.b102.sellyuserservice.controller.ProfileController;
import com.b102.sellyuserservice.domain.entity.NftPiece;
import com.b102.sellyuserservice.model.repository.NftPieceRepository;
import com.b102.sellyuserservice.vo.ArticleResponse;
import com.b102.sellyuserservice.vo.FractionResponse;
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
    if (userId.equals(profileUserId)) {
      List<ArticleResponse> articleResponseList = nftPieceRepository.findByUserId(profileUserId);

      articleResponseList.forEach( v -> {
        NftPiece nftPiece = nftPieceRepository.findByArticleId(v.getArticleId());
        ArticleResponse articleResponse = articleServiceClient.getArticle(v.getArticleId());
        FractionResponse fractionResponse = FractionResponse.builder()
                .articleId(v.getArticleId())
                .articleName(v.getArticleName())
                .articleImgUrl(v.getArticleImgUrl())
                .recentMarketPrice(articleResponse.getRecentMarketPrice())
                .pieceCnt(nftPiece.getNftPieceCnt())
                .rateChange(articleResponse.getRecentMarketPrice()/ nftPiece.getAvgPrice())
                .build();
        responses.add(fractionResponse);
      });
      return responses;
    }
    List<ArticleResponse> articleResponseList = nftPieceRepository.findByUserId(profileUserId);

    articleResponseList.forEach( v -> {
      ArticleResponse articleResponse = articleServiceClient.getArticle(v.getArticleId());
      FractionResponse fractionResponse = FractionResponse.builder()
              .articleId(v.getArticleId())
              .articleName(v.getArticleName())
              .articleImgUrl(v.getArticleImgUrl())
              .recentMarketPrice(articleResponse.getRecentMarketPrice())
              .build();
      responses.add(fractionResponse);
    });
    return responses;
  }


}
