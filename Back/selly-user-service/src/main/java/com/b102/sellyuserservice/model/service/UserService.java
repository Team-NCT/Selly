package com.b102.sellyuserservice.model.service;

import com.b102.sellyuserservice.domain.dto.UserDto;
import com.b102.sellyuserservice.domain.entity.UserEntity;
import com.b102.sellyuserservice.vo.RequestUpdate;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;

@Component
public interface UserService extends UserDetailsService {
  UserDto createUser(UserDto userDto) throws UnsupportedEncodingException;
  UserDto getUserByUserId(Long UserId);
  Iterable<UserEntity> getUserByAll();
  UserDto getUserDetailsByWallet(String wallet);
  UserDto updateUser(Long userId, RequestUpdate user) throws UnsupportedEncodingException;
}
