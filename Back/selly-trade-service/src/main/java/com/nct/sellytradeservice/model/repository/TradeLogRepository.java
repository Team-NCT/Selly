package com.nct.sellytradeservice.model.repository;

import com.nct.sellytradeservice.domain.entity.TradeLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TradeLogRepository extends JpaRepository<TradeLog, Long> {

  List<TradeLog> findBySeller(Long sellerId);
  List<TradeLog> findByStatus(boolean status);
  List<TradeLog> findByArticleId(Long articleId);
//  List<TradeLog> findTop5ByArticleIdOrderByDesc(Long articleId);

}
