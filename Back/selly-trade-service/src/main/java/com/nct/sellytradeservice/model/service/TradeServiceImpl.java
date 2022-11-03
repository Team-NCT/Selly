package com.nct.sellytradeservice.model.service;

import com.nct.sellytradeservice.client.ArticleServiceClient;
import com.nct.sellytradeservice.client.UserServiceClient;
import com.nct.sellytradeservice.domain.dto.*;
import com.nct.sellytradeservice.domain.entity.TradeLog;
import com.nct.sellytradeservice.domain.entity.TradeRegist;
import com.nct.sellytradeservice.model.repository.TradeLogRepository;
import com.nct.sellytradeservice.model.repository.TradeRegistRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TradeServiceImpl implements TradeService {

  private final UserServiceClient userServiceClient;
  private final ArticleServiceClient articleServiceClient;
  private final TradeLogRepository tradeLogRepository;
  private final TradeRegistRepository tradeRegistRepository;

//  @Override
//  public String registArticleSell(Long id, ArticleUpdateRequest articleUpdateRequest){
//    ArticleUpdateRequest.builder()
//                    .createRegist(LocalDateTime.now());
//    articleServiceClient.sellRegist(articleUpdateRequest, id);
//
//    return new String("asdf");
//  }

  @Override
  public ArticleResponseDto findById(Long id) {
    return articleServiceClient.articleResponse(id);
  }

  @Override
  public List<TradeResponse> findAll() {
    List<TradeLog> tradeLogList = tradeLogRepository.findAll();
    List<TradeResponse> tradeResponseList = new ArrayList<>();
    tradeLogList.forEach(v -> {
      tradeResponseList.add(new ModelMapper().map(v, TradeResponse.class));
    });
    return tradeResponseList;
  }

  @Override
  public List<TradeResponse> findBySell(String sell) {
    boolean status;
    List<TradeResponse> tradeResponseList = new ArrayList<>();
    if (Objects.equals(sell, "selling")) {
      status = true;
    } else if (Objects.equals(sell, "end")) {
      status = false;
    } else {
      List<TradeLog> articleList = tradeLogRepository.findAll();
      articleList.forEach(v -> {
        tradeResponseList.add(new ModelMapper().map(v, TradeResponse.class));
      });
      return tradeResponseList;
    }
    List<TradeLog> articleList = tradeLogRepository.findByStatus(status);
    articleList.forEach(v -> {
      tradeResponseList.add(new ModelMapper().map(v, TradeResponse.class));
    });
    return tradeResponseList;
  }

  @Transactional
  @Override
  public String registP2pSell(SellRegistRequest sellRegistRequest) {
    Object articleResponseDto = articleServiceClient.articleResponse(sellRegistRequest.getArticleId());
    articleResponseDto.
    if (articleResponseDto.getArticleId() == null) {
      return "존재하지 않는 상품입니다.";
    }
    tradeRegistRepository.save(sellRegistRequest.toEntity());
    return "등록 성공";
  }
  // 거래 API
  @Override
  public Object trade(Long sellerId, Long buyerId, TradeRequest tradeRequest) throws NullPointerException {
    Optional<TradeRegist> optionalTradeRegist = tradeRegistRepository.findById(tradeRequest.getArticleId());
    if (optionalTradeRegist.isPresent()) {
      TradeRegist tradeRegist = optionalTradeRegist.get();
      if (!tradeRegist.isStatus()) {
        return "종료된 거래입니다.";
      }
      if (tradeRegist.getPieceCnt() < tradeRequest.getPieceCnt()) {
        return "조각 재고가 부족합니다.";
      }
      Long buyer = tradeRequest.getBuyer();
      Long seller = tradeRegist.getSeller();
      // TradeRegist 수정
      Integer stock = tradeRegist.getPieceCnt() - tradeRequest.getPieceCnt();
      boolean status = stock != 0;
      System.out.println(status);
      System.out.println(stock);
      // status가 false(0)면 품절, 품절이면 status = false
      tradeRegist.updateTradeRegist(stock, status);
      tradeRegistRepository.save(tradeRegist);
      // 구매자 소유권 생성, 수정
      Optional<NftPieceDto> oBuyerOwnership = userServiceClient.getOwnership(buyer, tradeRequest);
      if (oBuyerOwnership.isPresent()) {
        NftPieceDto buyerOwnership = oBuyerOwnership.get();
        System.out.println("##########################################");
        System.out.println(buyerOwnership.getUserId());
        System.out.println(buyerOwnership.getAvgPrice());
        System.out.println(buyerOwnership.getNftPieceCnt());
//        double avgPrice = ((buyerOwnership.getAvgPrice() * buyerOwnership.getNftPieceCnt())
//                + (tradeRequest.getTradePrice() * tradeRequest.getPieceCnt()))
//                / (buyerOwnership.getNftPieceCnt() + tradeRequest.getPieceCnt());
//        Long nftPieceCnt = buyerOwnership.getNftPieceCnt() + tradeRequest.getPieceCnt();
//        System.out.println(avgPrice);
//        System.out.println("!@!#$!@#$!@#$!@#$!@#$@!$!@#$!@$!@#$!@$@!#$");
//        System.out.println(nftPieceCnt);
        if (buyerOwnership.getUserId() != null) {
          NftPieceRequest buyerRequest = NftPieceRequest.builder()
                  .avgPrice(((buyerOwnership.getAvgPrice() * buyerOwnership.getNftPieceCnt())
                          + (tradeRequest.getTradePrice() * tradeRequest.getPieceCnt()))
                          / (buyerOwnership.getNftPieceCnt() + tradeRequest.getPieceCnt()))
                  .nftPieceCnt(buyerOwnership.getNftPieceCnt() + tradeRequest.getPieceCnt())
                  .build();
          userServiceClient.updateOwnership(buyer, buyerRequest);
        }
//
//        NftPieceRequest buyerRequest = NftPieceRequest.builder()
//                .articleId(buyerOwnership.getArticleId())
//                .userId(buyerId)
//                .nftPieceCnt(nftPieceCnt)
//                .avgPrice(avgPrice)
////                .avgPrice(10)
////                .nftPieceCnt(5L)
//
//                .build();
//        userServiceClient.updateOwnership(buyer, buyerRequest);
      }
      userServiceClient.createOwnership(buyer, tradeRequest);

      // 판매자 소유권 삭제, 수정
      Optional<NftPieceDto> oSellerOwnership = userServiceClient.getOwnership(buyer, tradeRequest);
      if (oSellerOwnership.isPresent()) {
        NftPieceDto sellerOwnership = oSellerOwnership.get();
//      }
//      NftPieceDto sellerOwnership = userServiceClient.getOwnership(seller);
        if (!status) {
          userServiceClient.deleteOwnership(seller);
        } else {
          System.out.println("=========================================");
          NftPieceRequest nftPieceRequest = NftPieceRequest.builder()
                  .avgPrice((sellerOwnership.getAvgPrice() * sellerOwnership.getNftPieceCnt()
                          - tradeRequest.getTradePrice() * tradeRequest.getPieceCnt())
                          / (sellerOwnership.getNftPieceCnt() + tradeRequest.getPieceCnt()))
                  .nftPieceCnt(sellerOwnership.getNftPieceCnt() - tradeRequest.getPieceCnt())
//                  .avgPrice(10)
//                  .nftPieceCnt(5L)
                  .build();
          userServiceClient.updateOwnership(seller, nftPieceRequest);
        }
      }
      postTradeLog(tradeRegist.getTradeRegistId(), tradeRequest);
      return "거래 성공";
    }
    return "존재하지 않는 거래입니다.";
  }
  //거래 내역 등록 API
  @Transactional
  @Override
  public String postTradeLog(Long trade, TradeRequest tradeRequest) {
    Optional<TradeRegist> optionalTradeRegist = tradeRegistRepository.findById(trade);
    if (optionalTradeRegist.isPresent()) {
      TradeRegist tradeRegist = optionalTradeRegist.get();
        // 거래 로그 등록
        TradeLogRequest tradeLogRequest = TradeLogRequest.builder()
                .seller(tradeRegist.getSeller())
                .buyer(tradeRequest.getBuyer())
                .articleId(trade)
                .tradePrice(tradeRegist.getTradePrice())
                .pieceCnt(tradeRequest.getPieceCnt())
                .contractAddress(tradeRequest.getContractAddress())
                .build();
        tradeLogRepository.save(tradeLogRequest.toEntity());
        return "거래 로그 등록 완료";
      }
    return "존재하지 않는 거래입니다.";
  }
}
