package com.nct.sellytradeservice.model.repository;

import com.nct.sellytradeservice.domain.entity.TradeRegist;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TradeRegistRepository extends JpaRepository<TradeRegist, Long> {
  Optional<TradeRegist> findByArticleId(Long ArticleId);
  Optional<TradeRegist> findByArticleIdAndSaleContractAddress(Long ArticleId, String saleContractAddress);
  List<TradeRegist> findByArticleId(Long articleId, Sort sort);

  List<TradeRegist> findBySellerAndArticleId(Long userId, Long articleId,Sort sort);
}
