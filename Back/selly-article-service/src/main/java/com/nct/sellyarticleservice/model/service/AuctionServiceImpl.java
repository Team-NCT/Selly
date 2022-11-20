package com.nct.sellyarticleservice.model.service;

import com.nct.sellyarticleservice.client.UserServiceClient;
import com.nct.sellyarticleservice.domain.dto.NftPieceResponseDto;
import com.nct.sellyarticleservice.domain.dto.RequestAuctionBid;
import com.nct.sellyarticleservice.domain.dto.RequestAuctionRegist;
import com.nct.sellyarticleservice.domain.dto.ResponseArticle;
import com.nct.sellyarticleservice.domain.entity.Auction;
import com.nct.sellyarticleservice.model.repository.AuctionRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

@RequiredArgsConstructor
@Service
public class AuctionServiceImpl implements AuctionService{
  private final ArticleService articleService;
  private final AuctionRepository auctionRepository;
  private ModelMapper mapper = new ModelMapper();

  private final UserServiceClient userServiceClient;
  @Override
  public Auction createAuction(RequestAuctionRegist requestAuctionRegist, Long userId) {
    ResponseArticle responseArticle = articleService.findById(requestAuctionRegist.getArticleId());
    if (responseArticle.getArticleId() != null){
      List<Auction> check = auctionRepository.findByArticleId(requestAuctionRegist.getArticleId());
      final int[] checknum = {0};
      check.forEach(v ->{
        if(v.getAuctionState()){
          checknum[0]++;
        }
      });
      if (checknum[0] != 0){
        return null;
      }
      NftPieceResponseDto nftPieceResponseDto = userServiceClient.getPiece(userId, requestAuctionRegist.getArticleId());
      float get50 = ( (float) nftPieceResponseDto.getNftPieceCnt() / (float) responseArticle.getPrimaryCnt()) * 100;
      if (get50 <50){
        return null;
      }
      mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
      Auction auction = mapper.map(requestAuctionRegist, Auction.class);

      auction.setSeller(responseArticle.getOwner());
      return auctionRepository.save(auction);
    }return null;
  }

  @Override
  public Auction joinAuction(RequestAuctionBid requestAuctionBid) {
    ResponseArticle responseArticle = articleService.findById(requestAuctionBid.getArticleId());
    if (responseArticle.getArticleId() != null) {
      Auction auction = auctionRepository.findByAuctionId(requestAuctionBid.getAuctionId());
      if(auction.getLowPrice() > requestAuctionBid.getPrice()){
        return null;
      }
      if(auction.getPrice() >= requestAuctionBid.getPrice()){
        return null;
      }
      mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
      auction.setAuctionState(true);
      auction.setBuyer(requestAuctionBid.getBuyer());
      if (auction.getAuctionStart() == null){
        auction.setAuctionStart(LocalDateTime.now());
      }
      auction.setPrice(requestAuctionBid.getPrice());
      return auctionRepository.save(auction);
    }
    return null;
  }
}
