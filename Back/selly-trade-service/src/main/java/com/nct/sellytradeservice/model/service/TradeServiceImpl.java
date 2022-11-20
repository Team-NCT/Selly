package com.nct.sellytradeservice.model.service;

import com.nct.sellytradeservice.client.ArticleServiceClient;
import com.nct.sellytradeservice.client.SellyContractServiceClient;
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

  private final SellyContractServiceClient sellyContractServiceClient;
  private ModelMapper mapper = new ModelMapper();

  @Override
  public ArticleResponseDto findById(Long articleId, Long userId) {
    Object responseObject =  articleServiceClient.articleResponse(articleId, userId);
    return (ArticleResponseDto) articleServiceClient.articleResponse(articleId, userId);
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
    sellRegistRequest.setStatus(true);
    ResponseArticleId responseArticleId = articleServiceClient.responseArticleId(sellRegistRequest.getContractAddress(), sellRegistRequest.getTokenId());
    if (responseArticleId != null) {
      NftPieceResponseDto nftPieceResponseDto = userServiceClient.getOwnership(sellRegistRequest.getSeller(), responseArticleId.getArticleId()).getBody();
      if (nftPieceResponseDto == null) {
        NftPieceRequest nftPieceRequest = NftPieceRequest.builder()
                .userId(sellRegistRequest.getSeller())
                .articleId(responseArticleId.getArticleId())
                .nftPieceCnt(sellRegistRequest.getPieceCnt())
                .avgPrice(sellRegistRequest.getTradePrice())
                .trade(true) // true면 거래 할 수 있음
                .build();
        userServiceClient.createOwnership(sellRegistRequest.getSeller(), nftPieceRequest);
        log.debug("판매자 소유권 등록 완료");
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        TradeRegist tradeRegist = mapper.map(sellRegistRequest, TradeRegist.class);
        tradeRegist.setArticleId(responseArticleId.getArticleId());
        ResponseSaleCA responseSaleCA = sellyContractServiceClient.responseSaleCa(sellRegistRequest.getWallet(), sellRegistRequest.getOwnershipContractAddress());
        tradeRegist.setSaleContractAddress(responseSaleCA.getSaleContractAddress());
        tradeRegistRepository.save(tradeRegist);
        ArticleUpdateRequest articleUpdateRequest = new ArticleUpdateRequest();
        articleUpdateRequest.setAvailability(sellRegistRequest.isStatus());
        articleUpdateRequest.setPrice(sellRegistRequest.getTradePrice());
        articleUpdateRequest.setOwnerContractAddress(sellRegistRequest.getOwnershipContractAddress());
        articleUpdateRequest.setPrimaryCnt(sellRegistRequest.getPieceCnt());
        articleUpdateRequest.setCategory(sellRegistRequest.getCategory());
        articleServiceClient.response(articleUpdateRequest, responseArticleId.getArticleId());
        return "등록 성공";
      } else {
        NftPieceRequest nftPieceRequest = NftPieceRequest.builder()
                .userId(sellRegistRequest.getSeller())
                .articleId(responseArticleId.getArticleId())
                .trade(true)
                .nftPieceCnt(nftPieceResponseDto.getNftPieceCnt() - sellRegistRequest.getPieceCnt())
                .avgPrice((nftPieceResponseDto.getAvgPrice() * nftPieceResponseDto.getNftPieceCnt()
                        - nftPieceResponseDto.getAvgPrice() * sellRegistRequest.getPieceCnt())
                        / (nftPieceResponseDto.getNftPieceCnt() - sellRegistRequest.getPieceCnt()))
                .build();
        userServiceClient.updateOwnership(sellRegistRequest.getSeller(), nftPieceRequest);
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        TradeRegist tradeRegist = mapper.map(sellRegistRequest, TradeRegist.class);
        tradeRegist.setArticleId(responseArticleId.getArticleId());
        ResponseSaleCA responseSaleCA = sellyContractServiceClient.responseSaleCa(sellRegistRequest.getWallet(), sellRegistRequest.getOwnershipContractAddress());
        tradeRegist.setSaleContractAddress(responseSaleCA.getSaleContractAddress());
        tradeRegistRepository.save(tradeRegist);
        return "등록 성공";
      }
    } else {
      RequestArticleNoMinting requestArticleNoMinting = mapper.map(sellRegistRequest, RequestArticleNoMinting.class);
      requestArticleNoMinting.setOwner(sellRegistRequest.getSeller());
      requestArticleNoMinting.setOriginalAuthor(sellRegistRequest.getSeller());
      requestArticleNoMinting.setPrimaryCnt(sellRegistRequest.getPieceCnt());
      articleServiceClient.aricleCreateNoMinting(requestArticleNoMinting);
      ResponseArticleId responseArticleId1 = articleServiceClient.aricleCreateNoMinting(requestArticleNoMinting);
      NftPieceRequest nftPieceRequest = NftPieceRequest.builder()
              .userId(sellRegistRequest.getSeller())
              .articleId(responseArticleId1.getArticleId())
              .nftPieceCnt(sellRegistRequest.getPieceCnt())
              .avgPrice(sellRegistRequest.getTradePrice())
              .trade(true) // true면 거래 할 수 있음
              .build();
      userServiceClient.createOwnership(sellRegistRequest.getSeller(), nftPieceRequest);
      log.debug("판매자 소유권 등록 완료");
      ResponseArticleId getArticleId = articleServiceClient.responseArticleId(sellRegistRequest.getContractAddress(), sellRegistRequest.getTokenId());
      mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
      TradeRegist tradeRegist = mapper.map(sellRegistRequest, TradeRegist.class);
      tradeRegist.setArticleId(getArticleId.getArticleId());
      ResponseSaleCA responseSaleCA = sellyContractServiceClient.responseSaleCa(sellRegistRequest.getWallet(), sellRegistRequest.getOwnershipContractAddress());
      tradeRegist.setSaleContractAddress(responseSaleCA.getSaleContractAddress());
      tradeRegistRepository.save(tradeRegist);
      return "등록 성공";
    }
  }

  // 거래 API
  @Transactional
  @Override
  public Object trade(Long sellerId, Long buyerId, TradeRequest tradeRequest) throws NullPointerException {
    Optional<TradeRegist> optionalTradeRegist = tradeRegistRepository.findByArticleIdAndSaleContractAddress(tradeRequest.getArticleId(), tradeRequest.getSaleContractAddress());
    ResponseBuy responseBuy = sellyContractServiceClient.responseP2pBuy(tradeRequest.getWallet(), tradeRequest.getSaleContractAddress());
    if (optionalTradeRegist.isPresent()) {
      TradeRegist tradeRegist = optionalTradeRegist.get();
      if (!tradeRegist.isStatus()) {
        return "종료된 거래입니다.";
      }
      if (tradeRegist.getPieceCnt() < tradeRequest.getPieceCnt()) {
        return "조각 재고가 부족합니다.";
      }
      Long buyer = tradeRequest.getBuyerId();
      Long seller = tradeRegist.getSeller();
      // TradeRegist 수정
      // status가 false(0)면 품절, 품절이면 status = false
      Integer stock = tradeRegist.getPieceCnt() - tradeRequest.getPieceCnt();
      boolean status = stock != 0;
      log.debug(String.valueOf(status));
      log.debug("판매 등록 수정");
      tradeRegist.updateTradeRegist(stock, status);
      tradeRegistRepository.save(tradeRegist);
      System.out.println(tradeRegist);
      ResponseArticleUpdate responseArticleUpdate = new ResponseArticleUpdate();
      if (tradeRegistRepository.selectArticleStatus(tradeRegist.getArticleId()) == 0){
        responseArticleUpdate.setArticleId(tradeRegist.getArticleId());
        responseArticleUpdate.setAvailability(false);
        responseArticleUpdate.setRecentMarketPrice(tradeRegist.getTradePrice());
        articleServiceClient.articleAvailability(responseArticleUpdate);
      } else{
        responseArticleUpdate.setArticleId(tradeRegist.getArticleId());
        responseArticleUpdate.setAvailability(true);
        responseArticleUpdate.setRecentMarketPrice(tradeRegist.getTradePrice());
        articleServiceClient.articleAvailability(responseArticleUpdate);
      }

      // 소유권 조회x 바로 post, put 요청
      log.debug("소유권 수정, 삭제");
      userServiceClient.createOrEditOwnership(buyerId, tradeRequest);
      // 판매자 소유권 삭제, 수정
      log.debug("판매자 소유권 수정, 삭제");
      ResponseEntity<NftPieceResponseDto> oSellerOwnership = userServiceClient.getOwnership(sellerId, tradeRequest.getArticleId());
      NftPieceResponseDto sellerOwnership = oSellerOwnership.getBody();
      if (!status) {
        log.debug("판매자 소유권 삭제");
        userServiceClient.deleteOwnership(seller, tradeRequest.getArticleId());
      } else {
        log.debug("판매자 소유권 수정");
//        if (sellerOwnership.getNftPieceCnt() == null){
//          sellerOwnership.setNftPieceCnt(0);
//        }
        NftPieceRequest nftPieceRequest = NftPieceRequest.builder()
                .articleId(tradeRequest.getArticleId())
                .userId(sellerId)
//                .nftPieceCnt(sellerOwnership.getNftPieceCnt() - tradeRequest.getPieceCnt())
//                .avgPrice((sellerOwnership.getAvgPrice() * sellerOwnership.getNftPieceCnt()
//                        - tradeRequest.getTradePrice() * tradeRequest.getPieceCnt())
//                        / (sellerOwnership.getNftPieceCnt() - tradeRequest.getPieceCnt()))
//                .nftPieceCnt()
                .nftPieceCnt(sellerOwnership.getNftPieceCnt())
                .avgPrice(sellerOwnership.getAvgPrice())
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
  public List<TradeRegistResponse> getTradeRegistList(Long articleId) {
    Sort sort = Sort.by(
            Sort.Order.asc("tradePrice"),
            Sort.Order.desc("tradeRegistTime")
    );
    List<TradeRegist> tradeRegistList = tradeRegistRepository.findByArticleIdAndStatus(articleId, true, sort);
    List<TradeRegistResponse> tradeRegistResponseList = new ArrayList<>();
    tradeRegistList.forEach( v -> {
              TradeRegistResponse tradeRegistResponse = TradeRegistResponse.builder()
                      .seller(v.getSeller())
                      .saleContractAddress(v.getSaleContractAddress())
                      .tradePrice(v.getTradePrice())
                      .pieceCnt(v.getPieceCnt())
                      .build();
              tradeRegistResponseList.add(tradeRegistResponse);
      }
    );
    return tradeRegistResponseList;
  }

  // 특정 유저 NFT 조각 판매 리스트 요청
  @Override
  public List<TradeRegistResponse> getUserTradeRegistList(Long userId, Long articleId) {
    Sort sort = Sort.by(
            Sort.Order.desc("tradePrice"),
            Sort.Order.asc("tradeRegistTime")
    );
    List<TradeRegist> tradeRegistList = tradeRegistRepository.findBySellerAndArticleIdAndStatus(userId, articleId, true, sort);
    List<TradeRegistResponse> tradeRegistResponseList = new ArrayList<>();
    tradeRegistList.forEach( v -> {
      TradeRegistResponse tradeRegistResponse = TradeRegistResponse.builder()
              .seller(v.getSeller())
              .saleContractAddress(v.getSaleContractAddress())
              .tradePrice(v.getTradePrice())
              .pieceCnt(v.getPieceCnt())
              .build();
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
                .buyer(tradeRequest.getBuyerId())
                .articleId(tradeRegist.getArticleId())
                .tradePrice(tradeRegist.getTradePrice())
                .pieceCnt(tradeRequest.getPieceCnt())
                .contractAddress(tradeRequest.getSaleContractAddress())
                .status(true)
                .build();
        tradeLogRepository.save(tradeLogRequest.toEntity());
        return "거래 로그 등록 완료";
      }
    return "존재하지 않는 거래입니다.";
  }

  @Override
  public String dropTradeRegist(RequestDeleteTradeRegist requestDeleteTradeRegist) {
    TradeRegist tradeRegist = tradeRegistRepository.findBySaleContractAddressAndSeller(requestDeleteTradeRegist.getSaleContractAddress(), requestDeleteTradeRegist.getSeller());
    if (tradeRegist == null){
      return "거래 등록 취소에 실패했습니다.";
    }
    if (tradeRegist != null){
      ResponseDeleteTradeRegist responseDeleteTradeRegist = sellyContractServiceClient.responseCancel(requestDeleteTradeRegist.getWallet(), requestDeleteTradeRegist.getSaleContractAddress());
      tradeRegistRepository.delete(tradeRegist);
      NftPieceResponseDto nftPieceResponseDto = userServiceClient.getOwnership(requestDeleteTradeRegist.getSeller(), tradeRegist.getArticleId()).getBody();
      if (nftPieceResponseDto != null){
        NftPieceRequest nftPieceRequest = NftPieceRequest.builder()
                .articleId(tradeRegist.getArticleId())
                .userId(requestDeleteTradeRegist.getSeller())
                .nftPieceCnt(nftPieceResponseDto.getNftPieceCnt() + tradeRegist.getPieceCnt())
                .avgPrice(nftPieceResponseDto.getNftPieceCnt() * nftPieceResponseDto.getAvgPrice()
                        + tradeRegist.getPieceCnt() * tradeRegist.getTradePrice()
                        / (nftPieceResponseDto.getNftPieceCnt() + tradeRegist.getPieceCnt()))
                .trade(false)
                .build();
        userServiceClient.updateOwnership(requestDeleteTradeRegist.getSeller(), nftPieceRequest);
        return "거래 등록 취소에 성공하였습니다.";
      }
      if (nftPieceResponseDto == null){
        NftPieceRequest nftPieceRequest = NftPieceRequest.builder()
                .articleId(tradeRegist.getArticleId())
                .userId(requestDeleteTradeRegist.getSeller())
                .nftPieceCnt(tradeRegist.getPieceCnt())
                .avgPrice(tradeRegist.getTradePrice())
                .trade(false)
                .build();
        userServiceClient.createOwnership(requestDeleteTradeRegist.getSeller(), nftPieceRequest);
        return "거래 등록 취소에 성공하였습니다.";
      }
    }
    return "거래 등록 취소에 실패했습니다.";
  }
}
