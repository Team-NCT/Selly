package com.nct.sellytradeservice.model.service;

import com.nct.sellytradeservice.domain.dto.*;
import com.nct.sellytradeservice.domain.entity.TradeLog;
import com.nct.sellytradeservice.domain.entity.TradeRegist;
import com.nct.sellytradeservice.model.repository.TradeLogRepository;
import com.nct.sellytradeservice.model.repository.TradeRegistRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import java.util.*;

@RequiredArgsConstructor
@Service
public class TradeLogServiceImpl implements TradeLogService{

  private final TradeLogRepository tradeLogRepository;
  private final TradeRegistRepository tradeRegistRepository;
  @Override
  public float searchPieceAndPriceLog(Long sellerId) {
    List<TradeLog> log = tradeLogRepository.findBySeller(sellerId);
    final double[] returnValue = {0.0};
    log.forEach(v ->{
      returnValue[0] += (v.getTradePrice() * v.getPieceCnt());
    });
    return (float) returnValue[0];
  }

  @Override
  public List<TradeRankDto> tradeRank() {
    List<TradeRegist> tradeRegist = tradeRegistRepository.findAllGroupByArticleId();
    List<TradeRankDto> list = new ArrayList<>();
    tradeRegist.forEach(v-> {
      if (tradeLogRepository.countByArticleId(v.getArticleId()) != 0) {
        Integer responseSelectQuery = tradeLogRepository.selectArticleIdJPQL(v.getArticleId());
        System.out.println(responseSelectQuery);
        if (responseSelectQuery != null) {
          TradeRankDto tradeRankDto = new TradeRankDto();
          tradeRankDto.setArticleId(v.getArticleId());
          tradeRankDto.setTradeCount(tradeLogRepository.countByArticleId(v.getArticleId()));
          tradeRankDto.setPieceCount(responseSelectQuery);
          list.add(tradeRankDto);
        }
      }
    });
    Comparator<TradeRankDto> cp = new Comparator<TradeRankDto>() {
      @Override
      public int compare(TradeRankDto o1, TradeRankDto o2) {
        int a = o1.getTradeCount();
        int b = o2.getTradeCount();
        if (a > b){
          return -1;
        }else{
          return 1;
        }
      }
    };
    list.sort(cp);
    List<TradeRankDto> returnValue = new ArrayList<>();
    if (list.size() >10){
      returnValue = list.subList(0, 9);
      return returnValue;
    }
    return list;
  }

  @Override
  public HashMap<String, Object> historyArticle(Long articleId) {
    List<String> strings = tradeLogRepository.selectRecentHistoryLimit5(articleId);
    HashMap<String, Object> hashMap = new HashMap<>();
    List<HistoryResponse> historyDtos = new ArrayList<>();
    DecimalFormat form = new DecimalFormat("#.####");
    if (strings != null){
      strings.forEach(v->{
        HistoryDto returnValue = tradeLogRepository.selectDateHistory(v, articleId);
        System.out.println(returnValue);
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        HistoryResponse value = mapper.map(returnValue, HistoryResponse.class);
        value.setAvgPrice(Double.valueOf(form.format(value.getAvgPrice())));
        value.setLowPrice(Double.valueOf(form.format(value.getLowPrice())));
        value.setMaxPrice(Double.valueOf(form.format(value.getMaxPrice())));
        if( returnValue != null){
          historyDtos.add(value);
        }
      });
      hashMap.put("historyList", historyDtos);
      Double aDouble = tradeLogRepository.selectTotalAvg(articleId);
      hashMap.put("avgPrice",Double.valueOf(form.format(aDouble)));
      return hashMap;
    }
    return null;
  }
  public double rateChange(Long articleId) {
    LocalDateTime endDateTime = LocalDateTime.of(LocalDate.now().minusDays(1), LocalTime.of(23,59,59));
    TradeLog tradeLog = tradeLogRepository.findTopByArticleIdAndTradeTimeBeforeOrderByTradeTimeDesc(articleId, endDateTime);
    LocalDateTime startDateTimeToday = LocalDateTime.of(LocalDate.now(), LocalTime.of(0,0,0));
    LocalDateTime endDateTimeToday = LocalDateTime.now();
    TradeLog tradeLogToday = tradeLogRepository.findTopByArticleIdAndTradeTimeBetweenOrderByTradeTimeDesc(articleId, startDateTimeToday, endDateTimeToday);
    if (tradeLog== null) {
      return 0;
    }
    if (tradeLogToday == null) {
      return 0;
    }
    return ((tradeLog.getTradePrice()-tradeLogToday.getTradePrice()) / tradeLog.getTradePrice()) * 100;
  }
}