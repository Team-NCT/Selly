package com.nct.sellytradeservice.model.repository;

import com.nct.sellytradeservice.domain.entity.TradeLog;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;


@Repository
public class TradeLogCustomRepositoryImpl implements TradeLogCustomRepository {
  private final JPAQueryFactory jpaQueryFactory;

  public TradeLogCustomRepositoryImpl(JPAQueryFactory jpaQueryFactory){
    this.jpaQueryFactory = jpaQueryFactory;
  }

  @Override
  public Integer findTradePriceAvg(Long articleId) {
    return null;
  }
}
