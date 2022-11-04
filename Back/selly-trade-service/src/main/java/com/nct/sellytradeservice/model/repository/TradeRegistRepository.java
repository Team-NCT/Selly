package com.nct.sellytradeservice.model.repository;

import com.nct.sellytradeservice.domain.entity.TradeRegist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TradeRegistRepository extends JpaRepository<TradeRegist, Long> {
  Optional<TradeRegist> findByArticleId(Long ArticleId);
}
