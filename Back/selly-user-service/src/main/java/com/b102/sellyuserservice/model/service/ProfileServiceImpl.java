package com.b102.sellyuserservice.model.service;

import com.b102.sellyuserservice.client.ArticleServiceClient;
import com.b102.sellyuserservice.controller.ProfileController;
import com.b102.sellyuserservice.vo.ArticleResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ProfileServiceImpl implements ProfileService{

  private final ArticleServiceClient articleServiceClient;
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


}
