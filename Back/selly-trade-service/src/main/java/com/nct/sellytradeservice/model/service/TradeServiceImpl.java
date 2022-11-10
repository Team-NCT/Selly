package com.nct.sellytradeservice.model.service;

import com.nct.sellytradeservice.client.ArticleServiceClient;
import com.nct.sellytradeservice.client.UserServiceClient;
import com.nct.sellytradeservice.domain.dto.*;
import com.nct.sellytradeservice.domain.entity.TradeLog;
import com.nct.sellytradeservice.domain.entity.TradeRegist;
import com.nct.sellytradeservice.model.repository.TradeLogRepository;
import com.nct.sellytradeservice.model.repository.TradeRegistRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.modelmapper.convention.MatchingStrategies;

import java.util.*;
@Slf4j
@RequiredArgsConstructor
@Service
public class TradeServiceImpl implements TradeService {

  private final UserServiceClient userServiceClient;
  private final ArticleServiceClient articleServiceClient;
  private final TradeLogRepository tradeLogRepository;
  private final TradeRegistRepository tradeRegistRepository;

  private ModelMapper mapper= new ModelMapper();

//  @Override
//  public String registArticleSell(Long id, ArticleUpdateRequest articleUpdateRequest){
//    ArticleUpdateRequest.builder()
//                    .createRegist(LocalDateTime.now());
//    articleServiceClient.sellRegist(articleUpdateRequest, id);
//
//    return new String("asdf");
//  }

  @Override
  public ArticleResponseDto findById(Long articleId, Long userId) {
    Object responseObject =  articleServiceClient.articleResponse(articleId, userId);
    return (ArticleResponseDto) articleServiceClient.articleResponse(articleId, userId);
//    mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
//  return new ModelMapper().map(responseObject, ArticleResponseDto.class);

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

  // 판매 중, 판매 끝난 리스트 조회
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

  // 거래 등록
  @Transactional
  @Override
  public String registP2pSell(SellRegistRequest sellRegistRequest) {
    Object articleResponseDto = articleServiceClient.articleResponse(sellRegistRequest.getArticleId(), sellRegistRequest.getSeller());
    String setSaleContractAddress = "setSaleContractAddress";
    sellRegistRequest.setStatus(true);
    sellRegistRequest.setSaleContractAddress(setSaleContractAddress);
    if (sellRegistRequest.isArticleOwner()) {
      NftPieceRequest nftPieceRequest = NftPieceRequest.builder()
              .userId(sellRegistRequest.getSeller())
              .articleId(sellRegistRequest.getArticleId())
              .nftPieceCnt(sellRegistRequest.getPieceCnt())
              .avgPrice(sellRegistRequest.getTradePrice())
              .trade(true)
              .build();
      userServiceClient.createOwnership(sellRegistRequest.getSeller(), nftPieceRequest);
      System.out.println(sellRegistRequest.getPieceCnt());
      System.out.println(sellRegistRequest.getTradePrice());
      log.debug("판매자 소유권 등록 완료");
    }
    NftPieceRequest nftPieceRequest = NftPieceRequest.builder()
            .userId(sellRegistRequest.getSeller())
            .articleId(sellRegistRequest.getArticleId())
            .trade(true)
            .build();
    userServiceClient.updateOwnership(sellRegistRequest.getSeller(), nftPieceRequest);
    tradeRegistRepository.save(sellRegistRequest.toEntity());
    return "등록 성공";
  }
  // 거래 API
//  @Transactional
//  @Override
//  public Object trade(Long sellerId, Long buyerId, TradeRequest tradeRequest) throws NullPointerException {
//    Optional<TradeRegist> optionalTradeRegist = tradeRegistRepository.findByArticleId(tradeRequest.getArticleId());
//    if (optionalTradeRegist.isPresent()) {
//      TradeRegist tradeRegist = optionalTradeRegist.get();
//      if (!tradeRegist.isStatus()) {
//        return "종료된 거래입니다.";
//      }
//      if (tradeRegist.getPieceCnt() < tradeRequest.getPieceCnt()) {
//        return "조각 재고가 부족합니다.";
//      }
//      Long buyer = tradeRequest.getBuyer();
//      Long seller = tradeRegist.getSeller();
//      // TradeRegist 수정
//      // status가 false(0)면 품절, 품절이면 status = false
//      int stock = tradeRegist.getPieceCnt() - tradeRequest.getPieceCnt();
//      boolean status = stock != 0;
//      System.out.println(status);
//      System.out.println("판매 등록 수정");
//      tradeRegist.updateTradeRegist(stock, status);
//      tradeRegistRepository.save(tradeRegist);
//      // 구매자 소유권 생성, 수정
////      Optional<NftPieceDto> oBuyerOwnership = userServiceClient.getOwnership(buyer, tradeRequest);
//      System.out.println("소유권 조회");
//      ResponseEntity<NftPieceResponseDto> nftPieceDtoResponseEntity = userServiceClient.getOwnership(buyer, tradeRequest.getArticleId());
////      NftPieceResponseDto buyerOwnership = userServiceClient.getOwnership(buyer, tradeRequest.getArticleId());
////      Optional<NftPieceDto> oBuyerOwnership = userServiceClient.getOwnership(buyer, tradeRequest);
////      NftPieceResponseDto buyerOwnership = nftPieceDtoResponseEntity.getBody();
////      assert buyerOwnership == null;
//
////      if (buyerOwnership.getUserId() == null) {
//        System.out.println("##########################################");
////        assert buyerOwnership != null;
////        double avgPrice = ((buyerOwnership.getAvgPrice() * buyerOwnership.getNftPieceCnt())
////                + (tradeRequest.getTradePrice() * tradeRequest.getPieceCnt()))
////                / (buyerOwnership.getNftPieceCnt() + tradeRequest.getPieceCnt());
////        Long nftPieceCnt = buyerOwnership.getNftPieceCnt() + tradeRequest.getPieceCnt();
////        if (buyerOwnership.getUserId()!=null) {
////          System.out.println("a;sldkfjal;sdkjl;agja;sldgl");
////          NftPieceRequest buyerRequest = NftPieceRequest.builder()
////                  .avgPrice(((buyerOwnership.getAvgPrice() * buyerOwnership.getNftPieceCnt())
////                          + (tradeRequest.getTradePrice() * tradeRequest.getPieceCnt()))
////                          / (buyerOwnership.getNftPieceCnt() + tradeRequest.getPieceCnt()))
////                  .nftPieceCnt(buyerOwnership.getNftPieceCnt() + tradeRequest.getPieceCnt())
////                  .build();
////          userServiceClient.updateOwnership(buyer, buyerRequest);
////        }
////
////        NftPieceRequest buyerRequest = NftPieceRequest.builder()
////                .articleId(buyerOwnership.getArticleId())
////                .userId(buyerId)
////                .nftPieceCnt(nftPieceCnt)
////                .avgPrice(avgPrice)
//////                .avgPrice(10)
//////                .nftPieceCnt(5L)
////
////                .build();
////        userServiceClient.updateOwnership(buyer, buyerRequest);
////      }else {
////        System.out.println("구매자 소유권 등록");
////        userServiceClient.createOwnership(buyer, tradeRequest);
////      }
//    if (nftPieceDtoResponseEntity.hasBody()) {
//      System.out.println("구매자 소유권 수정");
//
//    }
//      System.out.println("구매자 소유권 등록");
//      userServiceClient.createOwnership(buyer, tradeRequest);
//
//      // 판매자 소유권 삭제, 수정
//      System.out.println(sellerId);
//      System.out.println("판매자 소유권 수정, 삭제");
////      ResponseEntity<NftPieceResponseDto> oSellerOwnership = userServiceClient.getOwnership(sellerId, tradeRequest);
//      NftPieceResponseDto sellerOwnership = userServiceClient.getOwnership(sellerId, tradeRequest.getArticleId());
////      if (oSellerOwnership.isPresent()) {
////        NftPieceDto sellerOwnership = oSellerOwnership.get();
////      }
////      NftPieceDto sellerOwnership = userServiceClient.getOwnership(seller);
////      NftPieceResponseDto sellerOwnership = oSellerOwnership.getBody();
//      if (!status) {
//        System.out.println("판매자 소유권 삭제");
////        ResponseEntity<Object> response = userServiceClient.deleteOwnership(seller, tradeRequest.getArticleId());
//        userServiceClient.deleteOwnership(seller, tradeRequest.getArticleId());
//      } else {
//        System.out.println("=========================================");
//        System.out.println("판매자 소유권 수정");
////          assert sellerOwnership != null;
//        System.out.println(sellerOwnership.getAvgPrice());
//        System.out.println(sellerOwnership.getNftPieceCnt());
//
//        NftPieceRequest nftPieceRequest = NftPieceRequest.builder()
//                .articleId(tradeRequest.getArticleId())
//                .userId(sellerId)
//                .nftPieceCnt(sellerOwnership.getNftPieceCnt() - tradeRequest.getPieceCnt())
//                .avgPrice((sellerOwnership.getAvgPrice() * sellerOwnership.getNftPieceCnt()
//                        - tradeRequest.getTradePrice() * tradeRequest.getPieceCnt())
//                        / (sellerOwnership.getNftPieceCnt() + tradeRequest.getPieceCnt()))
////                  .avgPrice(10)
////                  .nftPieceCnt(5L)
//                .build();
//        System.out.println(nftPieceRequest);
//        System.out.println(nftPieceRequest.getNftPieceCnt());
//        System.out.println(nftPieceRequest.getAvgPrice());
//        System.out.println("123412341234");
//        userServiceClient.updateOwnership(seller, nftPieceRequest);
//        System.out.println("567857685678");
//      }
//    postTradeLog(tradeRegist.getTradeRegistId(), tradeRequest);
//    return "거래 성공";
//    }
//    return "존재하지 않는 거래입니다.";
//  }

  @Transactional
  @Override
  public Object trade(Long sellerId, Long buyerId, TradeRequest tradeRequest) throws NullPointerException {
    Optional<TradeRegist> optionalTradeRegist = tradeRegistRepository.findByArticleId(tradeRequest.getArticleId());
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
      // status가 false(0)면 품절, 품절이면 status = false
      int stock = tradeRegist.getPieceCnt() - tradeRequest.getPieceCnt();
      boolean status = stock != 0;
      log.debug(String.valueOf(status));
      log.debug("판매 등록 수정");
      tradeRegist.updateTradeRegist(stock, status);
      tradeRegistRepository.save(tradeRegist);
      // 구매자 소유권 생성, 수정
//      System.out.println("소유권 조회");
//      ResponseEntity<NftPieceResponseDto> nftPieceDtoResponseEntity = userServiceClient.getOwnership(buyer, tradeRequest.getArticleId());
//      System.out.println(nftPieceDtoResponseEntity.getStatusCodeValue());
//      System.out.println(nftPieceDtoResponseEntity.getStatusCode());
//      System.out.println(nftPieceDtoResponseEntity.getBody());
//      System.out.println(nftPieceDtoResponseEntity.hasBody());
//      System.out.println("소유권 조회 아예 실패임??");
//      if (nftPieceDtoResponseEntity.getStatusCodeValue() != 500) {
//        NftPieceResponseDto buyerOwnership = nftPieceDtoResponseEntity.getBody();
//        System.out.println("구매자 소유권 수정");
//        NftPieceRequest nftPieceRequest = NftPieceRequest.builder()
//                .articleId(tradeRequest.getArticleId())
//                .userId(sellerId)
//                .nftPieceCnt(buyerOwnership.getNftPieceCnt() - tradeRequest.getPieceCnt())
//                .avgPrice((buyerOwnership.getAvgPrice() * buyerOwnership.getNftPieceCnt()
//                        - tradeRequest.getTradePrice() * tradeRequest.getPieceCnt())
//                        / (buyerOwnership.getNftPieceCnt() + tradeRequest.getPieceCnt()))
////                  .avgPrice(10)
////                  .nftPieceCnt(5L)
//                .build();
//        userServiceClient.updateOwnership(buyerId, nftPieceRequest);
//      } else {
//        System.out.println("구매자 소유권 등록");
//        userServiceClient.createOwnership(buyer, tradeRequest);
//      }
      // 소유권 조회x 바로 post, put 요청
      log.debug("소유권 수정, 삭제");
      userServiceClient.createOrEditOwnership(buyerId, tradeRequest);
      // 판매자 소유권 삭제, 수정
      System.out.println(sellerId);
      log.debug("판매자 소유권 수정, 삭제");
      ResponseEntity<NftPieceResponseDto> oSellerOwnership = userServiceClient.getOwnership(sellerId, tradeRequest.getArticleId());
      NftPieceResponseDto sellerOwnership = oSellerOwnership.getBody();
//      if (oSellerOwnership.isPresent()) {
//        NftPieceDto sellerOwnership = oSellerOwnership.get();
//      }
//      NftPieceDto sellerOwnership = userServiceClient.getOwnership(seller);
//      NftPieceResponseDto sellerOwnership = oSellerOwnership.getBody();
      if (!status) {
        log.debug("판매자 소유권 삭제");
//        ResponseEntity<Object> response = userServiceClient.deleteOwnership(seller, tradeRequest.getArticleId());
        userServiceClient.deleteOwnership(seller, tradeRequest.getArticleId());
      } else {
        log.debug("판매자 소유권 수정");
        NftPieceRequest nftPieceRequest = NftPieceRequest.builder()
                .articleId(tradeRequest.getArticleId())
                .userId(sellerId)
                .nftPieceCnt(sellerOwnership.getNftPieceCnt() - tradeRequest.getPieceCnt())
                .avgPrice((sellerOwnership.getAvgPrice() * sellerOwnership.getNftPieceCnt()
                        - tradeRequest.getTradePrice() * tradeRequest.getPieceCnt())
                        / (sellerOwnership.getNftPieceCnt() - tradeRequest.getPieceCnt()))
                .role("seller")
                .build();
        userServiceClient.updateOwnership(seller, nftPieceRequest);
      }
      postTradeLog(tradeRegist.getTradeRegistId(), tradeRequest);
      return "거래 성공";
    }
    return "존재하지 않는 거래입니다.";
  }

  // NFT 조각 판매 리스트 요청
  @Override
  public List<TradeRegistResponse> getTradeRegistList() {
    Sort sort = Sort.by(
            Sort.Order.asc("tradePrice"),
            Sort.Order.desc("tradeRegistTime")
    );
    List<TradeRegist> tradeRegistList = tradeRegistRepository.findAll(sort);
    List<TradeRegistResponse> tradeRegistResponseList = new ArrayList<>();
    tradeRegistList.forEach( v -> {
              TradeRegistResponse tradeRegistResponse = TradeRegistResponse.builder()
                      .seller(v.getSeller())
                      .saleContractAddress(v.getSaleContractAddress())
                      .tradePrice(v.getTradePrice())
                      .pieceCnt(v.getPieceCnt())
                      .build();
//              tradeRegistResponseList.add(new ModelMapper().map(v, TradeRegistResponse.class));
              tradeRegistResponseList.add(tradeRegistResponse);
      }
    );
    return tradeRegistResponseList;
  }

  // 특정 유저 NFT 조각 판매 리스트 요청
  @Override
  public List<TradeRegistResponse> getUserTradeRegistList(Long userId) {
    Sort sort = Sort.by(
            Sort.Order.desc("tradePrice"),
            Sort.Order.asc("tradeRegistTime")
    );
    List<TradeRegist> tradeRegistList = tradeRegistRepository.findBySeller(userId, sort);
    List<TradeRegistResponse> tradeRegistResponseList = new ArrayList<>();
    tradeRegistList.forEach( v -> {
      TradeRegistResponse tradeRegistResponse = TradeRegistResponse.builder()
              .seller(v.getSeller())
              .saleContractAddress(v.getSaleContractAddress())
              .tradePrice(v.getTradePrice())
              .pieceCnt(v.getPieceCnt())
              .build();
//              tradeRegistResponseList.add(new ModelMapper().map(v, TradeRegistResponse.class));
              tradeRegistResponseList.add(tradeRegistResponse);
            }
    );
    return tradeRegistResponseList;
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

  // 거래 히스토리 조회
  @GetMapping("/tradeLog")
  public List<TradeLog> findTradeLogByArticleId(Long articleId) {
    List<TradeLog> tradeLogList = tradeLogRepository.findByArticleId(articleId);
    HashMap<String, Object> result = new HashMap<>();
    List<TradeLogResponse> resultList = new ArrayList<>();
    double sumPrice = 0;
    int quantity = 0;
    double maxPrice=0;
    double minPrice = Double.MAX_VALUE;
    for (TradeLog tradeLog: tradeLogList) {
      sumPrice += tradeLog.getTradePrice();
      quantity += tradeLog.getPieceCnt();
    }
//    List<TradeLog> tradeLogList1 = tradeLogRepository.findTop5ByArticleIdOrderByDesc(articleId);
//    for (TradeLog tradeLog : tradeLogList1) {
//
//    }
    double avgPrice = sumPrice/quantity;
    result.put("avgPrice", avgPrice);

    return null;
  }
}