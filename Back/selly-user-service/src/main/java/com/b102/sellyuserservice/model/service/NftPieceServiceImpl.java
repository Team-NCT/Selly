package com.b102.sellyuserservice.model.service;

import com.b102.sellyuserservice.domain.dto.NftPieceDto;
import com.b102.sellyuserservice.domain.entity.NftPiece;
import com.b102.sellyuserservice.model.repository.NftPieceRepository;
import com.b102.sellyuserservice.model.repository.UserRepository;
import com.b102.sellyuserservice.vo.NftPieceRequest;
import com.b102.sellyuserservice.vo.NftPieceResponseDto;
import com.b102.sellyuserservice.vo.TradeRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Slf4j
@RequiredArgsConstructor
@Service
public class NftPieceServiceImpl implements NftPieceService{

  private final UserRepository userRepository;
  private final NftPieceRepository nftPieceRepository;
  private final BCryptPasswordEncoder passwordEncoder;
  private final ModelMapper mapper;

  @Override
  public NftPieceResponseDto getOwnershipByUserIdAndArticleId(Long userId, Long articleId) throws IllegalArgumentException {
    log.debug("소유권 찾기");
    log.debug(String.valueOf(userId));
    log.debug(String.valueOf(articleId));
    Optional<NftPiece> optionalNftPiece = nftPieceRepository.findByUserIdAndArticleId(userId, articleId);
    if (optionalNftPiece.isPresent()){
      NftPiece nftPiece = optionalNftPiece.get();
      return new NftPieceResponseDto(nftPiece);
    } return null;
//    NftPiece nftPiece = nftPieceRepository.findByUserIdAndArticleId(userId, articleId)
//            .orElseThrow(() -> new IllegalArgumentException("해당 소유권이 없습니다."));
//    return new NftPieceResponseDto(nftPiece);
    //  return nftPieceRepository.findByUserIdAndArticleId(userId, tradeRequest.getArticleId());
  }
  @Override
  public NftPieceDto postOwnership(Long userId, NftPieceRequest nftPieceRequest) {
//    NftPiece nftPiece = nftPieceRepository.save(mapper.map(tradeRequest, NftPiece.class));
    System.out.println("소유권 생성");
//    NftPiece nftPiece = nftPieceRepository.findByUserIdAndArticleId(userId, tradeRequest.getArticleId())
//            .orElseThrow(() -> new IllegalArgumentException("소유권이 없습니다."));
//
//    Optional<NftPiece> optionalNftPiece = nftPieceRepository.findByUserIdAndArticleId(userId, tradeRequest.getArticleId());
//    if (optionalNftPiece.isPresent()) {
//      NftPiece nftPiece = optionalNftPiece.get();
//      NftPiece nftPiece = NftPiece.builder()
    NftPiece nftPiece = NftPiece.builder()
            .articleId(nftPieceRequest.getArticleId())
            .userId(userId)
            .nftPieceCnt(nftPieceRequest.getNftPieceCnt())
            .avgPrice(nftPieceRequest.getAvgPrice())
            .build();
    nftPieceRepository.save(nftPiece);
    //    NftPiece nftPiece = nftPieceRepository.save(mapper.map(tradeRequest, NftPiece.class));
    return mapper.map(nftPiece, NftPieceDto.class);
  }
//    return new IllegalArgumentException("소유권 생성 실패");
//  }
//  @Override
//  public NftPieceResponseDto getOwnershipByUserIdAndArticleId(Long userId, TradeRequest tradeRequest) {
//    NftPiece nftPiece = nftPieceRepository.findByUserIdAndArticleId(userId, tradeRequest.getArticleId());
//    System.out.println(userId);
//    System.out.println(tradeRequest.getArticleId());
//    return mapper.map(nftPiece, NftPieceDto.class);
//  }

  @Override
  public NftPieceDto updateOwnership(Long userId, NftPieceRequest nftPieceRequest) {
    System.out.println("소유권 수정");
    System.out.println(userId);
    System.out.println(nftPieceRequest.getArticleId());
    NftPiece nftPiece = nftPieceRepository.findByUserIdAndArticleId(userId, nftPieceRequest.getArticleId())
            .orElseThrow(() -> new IllegalArgumentException("해당 소유권이 없습니다."));
    int nftPieceCnt = nftPiece.getNftPieceCnt();
    nftPiece.updateOwnership(
//            nftPiece.getNftPieceCnt()+ tradeRequest.getPieceCnt(),
//            (nftPiece.getAvgPrice()*nftPiece.getNftPieceCnt() + tradeRequest.getPieceCnt()* tradeRequest.getTradePrice())/(nftPiece.getNftPieceCnt()+ tradeRequest.getPieceCnt())
//            nftPieceCnt + tradeRequest.getNftPieceCnt(),
            nftPieceRequest.getNftPieceCnt(),
            nftPieceRequest.getAvgPrice(),
            nftPieceRequest.isTrade()
    );
    nftPieceRepository.save(nftPiece);
    return mapper.map(nftPiece, NftPieceDto.class);
  }

  @Override
  public NftPieceDto postOrEditOwnership(Long userId, TradeRequest tradeRequest) {
    Optional<NftPiece> optionalOwnership = nftPieceRepository.findByUserIdAndArticleId(userId, tradeRequest.getArticleId());
    if (optionalOwnership.isPresent()) {
      NftPiece nftPiece = optionalOwnership.get();
      int nftPieceCnt = nftPiece.getNftPieceCnt() + tradeRequest.getPieceCnt();
      NftPieceRequest nftPieceRequest = NftPieceRequest.builder()
              .articleId(tradeRequest.getArticleId())
              .nftPieceCnt(nftPieceCnt)
              .avgPrice(((nftPiece.getNftPieceCnt()*(nftPiece.getAvgPrice())) + tradeRequest.getPieceCnt()* tradeRequest.getTradePrice())
                      / (nftPiece.getNftPieceCnt()+ tradeRequest.getPieceCnt()))
              .userId(userId)
              .build();
//      NftPieceRequest nftPieceRequest = mapper.map(tradeRequest, NftPieceRequest.class);
      System.out.println(nftPieceRequest.getArticleId());
      updateOwnership(userId, nftPieceRequest);
    } else {
      NftPieceRequest nftPieceRequest = NftPieceRequest.builder()
              .articleId(tradeRequest.getArticleId())
              .nftPieceCnt(tradeRequest.getPieceCnt())
              .avgPrice((tradeRequest.getTradePrice()))
              .userId(userId)
              .build();
      postOwnership(userId, nftPieceRequest);
    }
    return null;
  }

  // NFT 조각 판매 현황
  @Override
  public List<NftPieceResponseDto> findTradeNftPieceList(Long userId, Long articleId) {
    List<NftPiece> tradeNftPieceList = nftPieceRepository.findByUserIdAndArticleIdAndTrade(userId, articleId, true);
    List<NftPieceResponseDto> nftPieceResponseDtoList = new ArrayList<>();
    tradeNftPieceList.forEach( v ->{
      nftPieceResponseDtoList.add(new ModelMapper().map(v, NftPieceResponseDto.class));
            }
    );
    return nftPieceResponseDtoList;
  }

  @Override
  public String deleteOwnership(Long userId, Long articleId) throws IllegalArgumentException {
    NftPiece nftPiece = nftPieceRepository.findByUserIdAndArticleId(userId, articleId)
            .orElseThrow(() -> new IllegalArgumentException("해당 소유권이 없습니다."));
    nftPieceRepository.delete(nftPiece);
    return "Delete Success";
  }
}
