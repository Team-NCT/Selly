package com.nct.sellytradeservice.model.repository;

import com.nct.sellytradeservice.domain.dto.ResponseArticleId;
import com.nct.sellytradeservice.domain.dto.TradeRegistDto;
import com.nct.sellytradeservice.domain.entity.TradeRegist;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TradeRegistRepository extends JpaRepository<TradeRegist, Long> {

  @Query(value = "SELECT * FROM TradeRegist GROUP BY articleId", nativeQuery = true)
  List<TradeRegist> findAllGroupByArticleId();
  @Query(value = "SELECT articleId FROM TradeRegist WHERE seller = :num GROUP BY articleId", nativeQuery = true)
  List<Long> findSellerGroupByArticleId(@Param("num") Long num);
  TradeRegist findBySaleContractAddressAndSeller(String saleContractAddress, Long seller);
  Optional<TradeRegist> findByArticleId(Long ArticleId);
  Optional<TradeRegist> findByArticleIdAndSaleContractAddress(Long ArticleId, String saleContractAddress);
  List<TradeRegist> findByArticleId(Long articleId, Sort sort);

  List<TradeRegist> findBySellerAndArticleId(Long userId, Long articleId,Sort sort);

  @Query(value = "SELECT SUM(pieceCnt) FROM TradeRegist WHERE articleId = :articleId", nativeQuery = true)
  Integer selectArticleStatus(@Param("articleId") Long articleId);
}
