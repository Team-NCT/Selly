package com.b102.sellyuserservice.model.service;

import com.b102.sellyuserservice.domain.dto.UserDto;
import com.b102.sellyuserservice.domain.entity.UserEntity;

public interface UserService {
  UserDto createUser(UserDto userDto);
  UserDto getUserByUserId(Long UserId);
  Iterable<UserEntity> getUserByAll();
}
