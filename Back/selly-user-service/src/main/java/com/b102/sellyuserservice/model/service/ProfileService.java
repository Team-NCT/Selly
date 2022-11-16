package com.b102.sellyuserservice.model.service;

import com.b102.sellyuserservice.vo.ArticleResponse;
import com.b102.sellyuserservice.vo.FractionResponse;

import java.util.List;

public interface ProfileService {
  List<ArticleResponse> findUserCreatedArticleList(Long userId);

  List<ArticleResponse> findUserSaleArticleList(Long userId);

  List<FractionResponse> getFraction(Long userId, Long profileUserId);
}
