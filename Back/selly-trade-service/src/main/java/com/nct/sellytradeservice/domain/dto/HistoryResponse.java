package com.nct.sellytradeservice.domain.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDateTime;
@Data
public class HistoryResponse {
  private String date;
  private Double avgPrice;
  private Double lowPrice;
  private Double maxPrice;

}
