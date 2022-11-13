package com.nct.sellytradeservice.client;

import com.nct.sellytradeservice.domain.dto.ResponseSaleCA;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "selly-contract-service")
public interface SellyContractServiceClient {
  @GetMapping("/listen/{wallet}/{ca}")
  ResponseSaleCA responseSaleCa(@PathVariable("wallet") String wallet, @PathVariable("ca") String ca);
}
