package com.nct.sellysearchservice.client;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "selly-user-service")
public interface UserServiceClient {

}
