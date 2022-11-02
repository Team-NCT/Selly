package com.nct.sellysearchservice.client;

import com.nct.sellysearchservice.domain.SearchUserResponse;
import com.nct.sellysearchservice.domain.UserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "selly-user-service")
public interface UserServiceClient {

  @GetMapping("/search/{keyword}")
  List<SearchUserResponse> userSearchResponse(@PathVariable("keyword") String keyword);
}
