package com.nct.sellytradeservice.model.repository;

import com.nct.sellytradeservice.domain.dto.HistoryDto;
import com.nct.sellytradeservice.domain.dto.ResponseSelectQuery;
import com.nct.sellytradeservice.domain.entity.TradeLog;
import org.hibernate.annotations.NamedNativeQuery;
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

  @Query(value = "SELECT date_format(tradeTime, \"%Y-%m-%d\") AS date FROM TradeLog where articleId = :articleId GROUP BY date_format(tradeTime, \"%Y-%m-%d\") LIMIT 5;"  , nativeQuery = true)
  List<String> selectRecentHistoryLimit5(@Param("articleId") Long articleId);

  @Query(value = "SELECT date_format(tradeTime, \"%Y-%m-%d\") As date, max(tradePrice) AS maxPrice, MIN(tradePrice) AS lowPrice, AVG(tradePrice) as avgPrice FROM TradeLog WHERE date_format(tradeTime, \"%Y-%m-%d\") = :historyDate AND articleId = :articleId GROUP BY articleId",nativeQuery = true)
  HistoryDto selectDateHistory(@Param("historyDate") String date, @Param("articleId") Long articleId);

  @Query(value = "SELECT AVG(tradePrice) AS avgPrice FROM TradeLog WHERE articleId = :articleId", nativeQuery = true)
  Double selectTotalAvg(@Param("articleId") Long articleId);
}
