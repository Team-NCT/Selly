package com.nct.sellytradeservice.client;

import com.nct.sellytradeservice.domain.dto.NftPieceDto;
import com.nct.sellytradeservice.domain.dto.NftPieceRequest;
import com.nct.sellytradeservice.domain.dto.NftPieceResponseDto;
import com.nct.sellytradeservice.domain.dto.TradeRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@FeignClient(name = "selly-user-service")
public interface UserServiceClient {
  @GetMapping("/get-ownership")
//  ResponseEntity<NftPieceResponseDto> getOwnership(@RequestParam("userId") Long userId, @RequestParam("articleId") Long articleId);
  ResponseEntity<NftPieceResponseDto> getOwnership(@RequestParam("userId") Long userId, @RequestParam("articleId") Long articleId);
  @PostMapping("/create-or-edit-ownership/{userId}")
  NftPieceDto createOrEditOwnership(@PathVariable("userId") Long userId, @RequestBody TradeRequest tradeRequest);

  @PostMapping("/ownership/{userId}")
  void createOwnership(@PathVariable("userId") Long userId, @RequestBody NftPieceRequest nftPieceRequest);
  @DeleteMapping(value = "/ownership/{userId}", produces = "application/json")
  void deleteOwnership(@RequestParam("userId") Long userId, @RequestParam("articleId") Long articleId);
  @PutMapping("/ownership/{userId}")
  NftPieceDto updateOwnership(@PathVariable("userId") Long userId, @RequestBody NftPieceRequest tradeRequest);

}
