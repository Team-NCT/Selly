package com.b102.sellyuserservice.model.service;

import com.b102.sellyuserservice.domain.dto.UserDto;
import com.b102.sellyuserservice.domain.entity.UserEntity;
import com.b102.sellyuserservice.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
  private final UserRepository userRepository;
  private final BCryptPasswordEncoder passwordEncoder;

  @Override
  public UserDetails loadUserByUsername(String wallet) throws UsernameNotFoundException {
    UserEntity userEntity = userRepository.findByWallet(wallet);
    if(userEntity == null){
      throw new UsernameNotFoundException(wallet);
    }
    System.out.println("로그인 성공");
    return new User(userEntity.getWallet(), userEntity.getEncryptedPwd(), true, true, true, true, new ArrayList<>());
  }

  @Override
  public UserDto createUser(UserDto userDto){
    ModelMapper mapper = new ModelMapper();
    mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
    UserEntity userEntity = mapper.map(userDto, UserEntity.class); // UserDto Type을 UserEntity Type으로 변경
    userEntity.setEncryptedPwd(passwordEncoder.encode(userDto.getPwd()));
    userRepository.save(userEntity);

    return mapper.map(userEntity, UserDto.class);
  }

  @Override
  public UserDto getUserByUserId(Long userId) {
    UserEntity userEntity = userRepository.findByUserId(userId);
    if (userEntity == null){
      throw new UsernameNotFoundException("해당 유저가 없습니다.");
    }
  
    return new ModelMapper().map(userEntity, UserDto.class);
  }

  @Override
  public Iterable<UserEntity> getUserByAll(){
    return userRepository.findAll();
  }

}
