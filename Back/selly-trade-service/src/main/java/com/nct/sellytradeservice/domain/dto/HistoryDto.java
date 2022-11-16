package com.nct.sellytradeservice.domain.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

//@Data
//@JsonInclude(JsonInclude.Include.NON_NULL)
public interface HistoryDto {
  String getDate();
  Double getMaxPrice();
  Double getLowPrice();
  Double getAvgPrice();
}
