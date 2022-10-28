package com.b102.sellyuserservice.model.service;

import com.b102.sellyuserservice.domain.dto.UserDto;

public interface UserService {
  UserDto createUser(UserDto userDto);
}
