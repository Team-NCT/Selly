package com.nct.sellyarticleservice.client;

import com.nct.sellyarticleservice.domain.dto.RequestMinting;
import com.nct.sellyarticleservice.domain.dto.ResponseListen;
import com.nct.sellyarticleservice.domain.dto.ResponseMinting;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.ws.rs.Path;
import java.util.List;

@FeignClient(name="selly-contract-service")
public interface SellyContractServiceClient {

//  @PostMapping("/minting")
  @GetMapping("/minting")
//  ResponseMinting getMinting(@RequestBody RequestMinting requestMinting);
  ResponseMinting getMinting();
  @GetMapping("/listen/{wallet}")
  ResponseListen getListen(@PathVariable("wallet") String wallet);

}
