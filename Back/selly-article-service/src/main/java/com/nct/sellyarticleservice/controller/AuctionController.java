package com.nct.sellyarticleservice.controller;

import com.nct.sellyarticleservice.domain.dto.RequestAuctionBid;
import com.nct.sellyarticleservice.domain.dto.RequestAuctionRegist;
import com.nct.sellyarticleservice.domain.dto.ResponseAutcionbid;
import com.nct.sellyarticleservice.domain.entity.Auction;
import com.nct.sellyarticleservice.model.service.AuctionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/selly-article-service")
@Slf4j
public class AuctionController {

  private ModelMapper mapper = new ModelMapper();
  private final AuctionService auctionService;
  @PostMapping("/auction")
  public String auctionRegist(@RequestBody RequestAuctionRegist requestAuctionRegist, @RequestHeader("userId") Long userId){
    Auction auction = auctionService.createAuction(requestAuctionRegist, userId);
    if (auction != null){
      return "경매 등록에 성공하였습니다.";
    }
    return "경매 등록에 실패하였습니다.";
  }

  @PutMapping("/auction/join")
  public ResponseAutcionbid bidding(@RequestBody RequestAuctionBid requestAuctionBid){
    ResponseAutcionbid responseAutcionbid = mapper.map(auctionService.joinAuction(requestAuctionBid), ResponseAutcionbid.class);
    return responseAutcionbid;
  }

}
