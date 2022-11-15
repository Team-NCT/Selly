package com.nct.sellytradeservice.model.service;

import com.nct.sellytradeservice.domain.dto.ResponseCertification;

import java.math.BigDecimal;

public interface TradeLogService {
  float searchPieceAndPriceLog(Long sellerId);
}
