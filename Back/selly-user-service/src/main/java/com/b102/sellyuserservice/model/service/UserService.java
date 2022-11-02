package com.b102.sellyuserservice.model.service;

import com.b102.sellyuserservice.domain.dto.FollowDto;
import com.b102.sellyuserservice.domain.dto.UserDto;
import com.b102.sellyuserservice.domain.entity.UserEntity;
import com.b102.sellyuserservice.vo.RequestUpdate;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;

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

}
