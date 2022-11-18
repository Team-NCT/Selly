package com.nct.sellytradeservice.model.service;

import com.nct.sellytradeservice.domain.dto.HistoryDto;
import com.nct.sellytradeservice.domain.dto.ResponseCertification;
import com.nct.sellytradeservice.domain.dto.TradeRankDto;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface TradeLogService {
  float searchPieceAndPriceLog(Long sellerId);
  List<TradeRankDto> tradeRank();

  HashMap<String, Object> historyArticle(Long articleId);

  double rateChange(Long articleId);

}
