package com.nct.sellytradeservice.model.repository;

import com.nct.sellytradeservice.domain.entity.TradeRegist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TradeRegistRepository extends JpaRepository<TradeRegist, Long> {
}
