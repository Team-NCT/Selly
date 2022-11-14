package com.nct.sellytradeservice.client;

import com.nct.sellytradeservice.domain.dto.ResponseBuy;
import com.nct.sellytradeservice.domain.dto.ResponseDeleteTradeRegist;
import com.nct.sellytradeservice.domain.dto.ResponseSaleCA;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "selly-contract-service")
public interface SellyContractServiceClient {
  @GetMapping("/listen/{wallet}/{ca}")
  ResponseSaleCA responseSaleCa(@PathVariable("wallet") String wallet, @PathVariable("ca") String ca);

  @GetMapping("/listensa/{wallet}/{sa}")
  ResponseBuy responseP2pBuy(@PathVariable("wallet") String wallet, @PathVariable("sa") String sa);

  @GetMapping("/listencancel/{wallet}/{sa}")
  ResponseDeleteTradeRegist responseCancel(@PathVariable("wallet") String wallet, @PathVariable("sa") String saleContractAddress);


}
