package com.nct.sellytradeservice.model.service;

import com.nct.sellytradeservice.domain.dto.ResponseCertification;
import com.nct.sellytradeservice.domain.dto.TradeRankDto;

import java.math.BigDecimal;
import java.util.List;

public interface TradeLogService {
  float searchPieceAndPriceLog(Long sellerId);
  List<TradeRankDto> tradeRank();
}
