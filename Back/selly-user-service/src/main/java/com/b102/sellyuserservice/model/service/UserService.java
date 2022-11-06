package com.b102.sellyuserservice.model.service;

import com.b102.sellyuserservice.domain.dto.FollowDto;
import com.b102.sellyuserservice.domain.dto.NftPieceDto;
import com.b102.sellyuserservice.domain.dto.UserDto;
import com.b102.sellyuserservice.domain.entity.NftPiece;
import com.b102.sellyuserservice.domain.entity.UserEntity;
import com.b102.sellyuserservice.vo.*;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

@Component
public interface UserService extends UserDetailsService {
  // 회원가입
  UserDto createUser(UserDto userDto) throws UnsupportedEncodingException;

  // 특정 아이디 조회
  UserDto getUserByUserId(Long UserId);

  // 모든 아이디 조회
  Iterable<UserEntity> getUserByAll();

  // 로그인
  UserDto getUserDetailsByWallet(String wallet);

  // 개인정보변경
  UserDto updateUser(Long userId, RequestUpdate user) throws UnsupportedEncodingException;

  List<SearchUserResponse> findByKeyword(String keyword);

  String trade(Long userId, TradeRequest tradeRequest);

  NftPieceDto postOwnership(Long userId, TradeRequest tradeRequest);
//  NftPieceResponseDto getOwnershipByUserIdAndArticleId(Long userId, TradeRequest tradeRequest);
  NftPieceResponseDto getOwnershipByUserIdAndArticleId(Long userId, Long articleId);

  String deleteOwnership(Long userId, Long articleId);

  NftPieceDto updateOwnership(Long userId, NftPieceRequest tradeRequest);

}
