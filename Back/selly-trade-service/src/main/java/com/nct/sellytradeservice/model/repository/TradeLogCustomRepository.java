package com.nct.sellytradeservice.model.repository;

public interface TradeLogCustomRepository {
  Integer findTradePriceAvg(Long articleId);
}
