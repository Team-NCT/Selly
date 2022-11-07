package com.b102.sellyuserservice.controller;

import com.b102.sellyuserservice.domain.dto.NftPieceDto;
import com.b102.sellyuserservice.model.repository.NftPieceRepository;
import com.b102.sellyuserservice.model.service.FollowService;
import com.b102.sellyuserservice.model.service.NftPieceService;
import com.b102.sellyuserservice.model.service.UserService;
import com.b102.sellyuserservice.vo.NftPieceRequest;
import com.b102.sellyuserservice.vo.NftPieceResponseDto;
import com.b102.sellyuserservice.vo.TradeRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/")
@RestController
public class NftPieceController {
  private final UserService userService;
  private final NftPieceService nftPieceService;
  private final FollowService followService;
  private final Environment env;
  private final NftPieceRepository nftPieceRepository;

  @GetMapping("/nftPiece/{userId}")
  public Integer numOfNftPiece(@PathVariable("userId") Long userId) {
    return nftPieceRepository.countByUserId(userId);
  }
  @GetMapping("/get-ownership")
  public ResponseEntity<NftPieceResponseDto> getOwnership(@RequestParam("userId") Long userId, @RequestParam("articleId") Long articleId) throws IllegalArgumentException {
    System.out.println("소유권 검색");
    System.out.println(userId);
    NftPieceResponseDto response = nftPieceService.getOwnershipByUserIdAndArticleId(userId, articleId);
//    NftPieceResponseDto response = userService.getOwnershipByUserIdAndArticleId(userId, tradeRequest);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }
  @PostMapping("/create-or-edit-ownership/{userId}")
  public ResponseEntity<Object> createOrEditOwnership(@PathVariable("userId") Long userId, @RequestBody TradeRequest tradeRequest) {
    NftPieceDto response = nftPieceService.postOrEditOnership(userId, tradeRequest);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }
  @PostMapping("/ownership/{userId}")
  public ResponseEntity<Object> postOwnership(@PathVariable("userId") Long userId, @RequestBody NftPieceRequest nftPieceRequest) {
    NftPieceDto response = nftPieceService.postOwnership(userId, nftPieceRequest);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  // 특정 유저가 가진 특정 작품의 소유권 조회
//  @GetMapping("/ownership/{userId}")
//  public ResponseEntity<Object> getOwnershipByUserIdAndArticleId(@PathVariable("userId") Long userId, @RequestBody TradeRequest tradeRequest) {
//    Object response = userService.getOwnershipByUserIdAndArticleId(userId, tradeRequest);
//    return ResponseEntity.status(HttpStatus.OK).body(response);
//  }
//  @GetMapping("/ownership/{userId}")
//  public ResponseEntity<NftPieceResponseDto> getOwnershipByUserIdAndArticleId(@PathVariable("userId") Long userId, @RequestBody TradeRequest tradeRequest) {
//    NftPieceResponseDto response = userService.getOwnershipByUserIdAndArticleId(userId, tradeRequest);
//    return ResponseEntity.status(HttpStatus.OK).body(response);
//  }


  @PutMapping("/ownership/{userId}")
  public ResponseEntity<Object> updateOwnership(@PathVariable("userId") Long userId, @RequestBody NftPieceRequest tradeRequest) {
    NftPieceDto response = nftPieceService.updateOwnership(userId, tradeRequest);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }
  @DeleteMapping("/ownership/{userId}")
  public ResponseEntity<Object> deleteOwnership(@RequestParam("userId") Long userId, @RequestParam("articleId") Long articleId) {
    String response = nftPieceService.deleteOwnership(userId, articleId);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @GetMapping
  public
}

