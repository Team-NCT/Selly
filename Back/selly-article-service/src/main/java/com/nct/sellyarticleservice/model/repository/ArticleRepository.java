package com.nct.sellyarticleservice.model.repository;

import com.nct.sellyarticleservice.domain.dto.ResponseInfoArticle;
import com.nct.sellyarticleservice.domain.entity.Article;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, Long> {
  Long countBy();

  Integer countByOwner(Long owner);

  List<ResponseInfoArticle> findByArticleId(Long articleId);
  Article findByContractAddressAndTokenId(String contractAddress, String tokenId);
  List<Article> findByCategoryAndAvailability(String category, boolean availability, Sort sort);

  List<Article> findByAvailability(boolean availability, Sort sort);

  List<Article> findAllByStatus(boolean status);

  List<Article> findAllByAuction(boolean status);

  List<Article> findAllByArticleNameContaining(String articleName);

  List<Article> findByOriginalAuthor(Long userId);

//  List<Article> findAllByCreateRegistDesc();
}
