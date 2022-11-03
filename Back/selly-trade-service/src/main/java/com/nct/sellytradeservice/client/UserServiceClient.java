package com.nct.sellytradeservice.client;

import com.nct.sellytradeservice.domain.dto.NftPieceDto;
import com.nct.sellytradeservice.domain.dto.NftPieceRequest;
import com.nct.sellytradeservice.domain.dto.TradeRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@FeignClient(name = "selly-user-service")
public interface UserServiceClient {
  @GetMapping("/ownership/{userId}")
  Optional<NftPieceDto> getOwnership(@PathVariable("userId") Long userId, @RequestBody TradeRequest tradeRequest);
  @PostMapping("/ownership/{userId}")
  NftPieceDto createOwnership(@PathVariable("userId") Long userId, @RequestBody TradeRequest tradeRequest);
  @DeleteMapping("/ownership/{userId}")
  NftPieceDto deleteOwnership(@PathVariable("userId") Long userId);
  @PutMapping("/ownership/{userId}")
  NftPieceDto updateOwnership(@PathVariable("userId") Long userId, @RequestBody NftPieceRequest tradeRequest);
}
