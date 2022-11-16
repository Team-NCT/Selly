package com.nct.sellyarticleservice.model.service;

import com.nct.sellyarticleservice.domain.dto.ArticleResponse;

import java.util.List;

public interface ProfileService {
  List<ArticleResponse>  findUserSaleArticleList(Long userId);
}
