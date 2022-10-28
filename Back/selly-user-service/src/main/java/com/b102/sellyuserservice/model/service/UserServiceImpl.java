package com.b102.sellyuserservice.model.service;

import com.b102.sellyuserservice.domain.dto.UserDto;
import com.b102.sellyuserservice.domain.entity.UserEntity;
import com.b102.sellyuserservice.model.repository.UserRepository;
import com.b102.sellyuserservice.model.service.UserService;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
  @Autowired
  UserRepository userRepository;

  @Override
  public UserDto createUser(UserDto userDto){
    ModelMapper mapper = new ModelMapper();
    mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
    UserEntity userEntity = mapper.map(userDto, UserEntity.class); // UserDto Type을 UserEntity Type으로 변경
    userEntity.setWallet("encrypted1");
    userRepository.save(userEntity);

    UserDto returnUserDto = mapper.map(userEntity, UserDto.class);
    return returnUserDto;
  }
}
