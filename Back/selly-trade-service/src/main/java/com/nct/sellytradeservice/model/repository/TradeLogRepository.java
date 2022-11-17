package com.nct.sellytradeservice.model.repository;

import com.nct.sellytradeservice.domain.dto.ResponseSelectQuery;
import com.nct.sellytradeservice.domain.entity.TradeLog;
import org.hibernate.annotations.NamedNativeQuery;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface TradeLogRepository extends JpaRepository<TradeLog, Long> {

  @Query(value = "SELECT SUM(pieceCnt) FROM TradeRegist where articleId = :num GROUP BY articleId")
  Integer selectArticleIdJPQL(@Param("num") Long num);
  List<TradeLog> findBySeller(Long sellerId);
  List<TradeLog> findByStatus(boolean status);
  List<TradeLog> findByArticleId(Long articleId);
//  List<TradeLog> findTop5ByArticleIdOrderByDesc(Long articleId);
  Integer countByArticleId(Long articleId);
  Integer countBySeller(Long seller);
  TradeLog findTopByArticleIdAndTradeTimeBetweenOrderByTradeTimeDesc(Long articleId, LocalDateTime startDateTime, LocalDateTime endDateTime);
  TradeLog findTopByArticleIdAndTradeTimeBeforeOrderByTradeTimeDesc(Long articleId, LocalDateTime endDateTime);
}
