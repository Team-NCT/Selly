package com.b102.sellyuserservice.controller;

import com.b102.sellyuserservice.domain.dto.NftPieceDto;
import com.b102.sellyuserservice.domain.entity.NftPiece;
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

import java.util.List;
import java.util.Optional;

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

  // NFT 조각 판매 리스트 조회
  @GetMapping
  public List<NftPieceResponseDto> findTradeNftPieceList(@PathVariable("userId") Long userId, @RequestParam("articleId") Long articleId) {
    return nftPieceService.findTradeNftPieceList(userId, articleId);
  }
  // NFT 조각 소유 개수 조회
  @GetMapping("/nftPiece/{userId}")
  public Object numOfNftPiece(@PathVariable("userId") Long userId, @RequestParam("articleId") Long articleId) {
    Optional<NftPiece> optionalNftPiece = nftPieceRepository.findByUserIdAndArticleId(userId, articleId);
    if (optionalNftPiece.isPresent()) {
      NftPiece nftPiece = optionalNftPiece.get();
      return nftPiece.getNftPieceCnt();
    }
    return 0;
  }
  @GetMapping("/get-ownership")
  public ResponseEntity<NftPieceResponseDto> getOwnership(@RequestParam("userId") Long userId, @RequestParam("articleId") Long articleId) throws IllegalArgumentException {
    NftPieceResponseDto response = nftPieceService.getOwnershipByUserIdAndArticleId(userId, articleId);
    if(ResponseEntity.status(HttpStatus.OK).body(response).getBody() == null){
      System.out.println("true");
    }
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }
  @PostMapping("/create-or-edit-ownership/{userId}")
  public ResponseEntity<Object> createOrEditOwnership(@PathVariable("userId") Long userId, @RequestBody TradeRequest tradeRequest) {
    NftPieceDto response = nftPieceService.postOrEditOwnership(userId, tradeRequest);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }
  @PostMapping("/ownership/{userId}")
  public ResponseEntity<Object> postOwnership(@PathVariable("userId") Long userId, @RequestBody NftPieceRequest nftPieceRequest) {
    NftPieceDto response = nftPieceService.postOwnership(userId, nftPieceRequest);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

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
}

