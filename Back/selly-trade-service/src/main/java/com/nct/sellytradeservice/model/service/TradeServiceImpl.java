package com.nct.sellytradeservice.model.service;

import lombok.RequiredArgsConstructor;
import org.aspectj.bridge.Message;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TradeServiceImpl implements TradeService {
  @Override
  public String registArticleSell(Long articleId){

    return new String("asdf");
  }
}
