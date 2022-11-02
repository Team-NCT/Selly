package com.nct.sellytradeservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "selly-user-service")
public interface UserServiceClient {
  @DeleteMapping("/selly-user-service/{userId}")
  String ownershipDelete(@PathVariable("userId") Long userId);
}
