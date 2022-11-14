package com.nct.sellyarticleservice.model.service;

import com.nct.sellyarticleservice.domain.dto.RequestAuctionBid;
import com.nct.sellyarticleservice.domain.dto.RequestAuctionRegist;
import com.nct.sellyarticleservice.domain.entity.Auction;

public interface AuctionService {
  Auction createAuction(RequestAuctionRegist requestAuctionRegist, Long userId);
  Auction joinAuction(RequestAuctionBid requestAuctionBid);
}
