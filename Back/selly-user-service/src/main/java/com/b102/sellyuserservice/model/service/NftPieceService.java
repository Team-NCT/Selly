package com.b102.sellyuserservice.model.service;

import com.b102.sellyuserservice.domain.dto.NftPieceDto;
import com.b102.sellyuserservice.vo.NftPieceRequest;
import com.b102.sellyuserservice.vo.NftPieceResponseDto;
import com.b102.sellyuserservice.vo.TradeRequest;

public interface NftPieceService {
  NftPieceDto postOwnership(Long userId, NftPieceRequest nftPieceRequest);
  //  NftPieceResponseDto getOwnershipByUserIdAndArticleId(Long userId, TradeRequest tradeRequest);
  NftPieceResponseDto getOwnershipByUserIdAndArticleId(Long userId, Long articleId);

  String deleteOwnership(Long userId, Long articleId);

  NftPieceDto updateOwnership(Long userId, NftPieceRequest tradeRequest);

  NftPieceDto postOrEditOnership(Long userId, TradeRequest tradeRequest);
}
