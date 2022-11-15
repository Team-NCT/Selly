package com.nct.sellytradeservice.model.service;

import com.nct.sellytradeservice.domain.dto.ResponseCertification;
import com.nct.sellytradeservice.domain.entity.TradeLog;
import com.nct.sellytradeservice.model.repository.TradeLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@RequiredArgsConstructor
@Service
public class TradeLogServiceImpl implements TradeLogService{

  private final TradeLogRepository tradeLogRepository;
  @Override
  public float searchPieceAndPriceLog(Long sellerId) {
    List<TradeLog> log = tradeLogRepository.findBySeller(sellerId);
    final double[] returnValue = {0.0};
    log.forEach(v ->{
      returnValue[0] += (v.getTradePrice() * v.getPieceCnt());
    });
    return (float) returnValue[0];
  }
}
