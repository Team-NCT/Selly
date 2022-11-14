package com.nct.sellyarticleservice.client;

import com.nct.sellyarticleservice.domain.dto.NftPieceResponseDto;
import com.nct.sellyarticleservice.vo.ResponseUser;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "selly-user-service")
public interface UserServiceClient {
  @GetMapping("/users/{userId}")
  ResponseUser getUser(@PathVariable("userId") Long userId);

  @GetMapping("/get-ownership")
  NftPieceResponseDto getPiece(@RequestParam("userId") Long userId, @RequestParam("articleId") Long articleId);
}
