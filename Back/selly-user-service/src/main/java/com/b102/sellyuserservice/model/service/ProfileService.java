package com.b102.sellyuserservice.model.service;

import com.b102.sellyuserservice.vo.ArticleResponse;

import java.util.List;

public interface ProfileService {
  List<ArticleResponse> findUserCreatedArticleList(Long userId);

  List<ArticleResponse> findUserSaleArticleList(Long userId);
}
