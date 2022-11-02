package com.b102.sellyuserservice.model.service;

import com.b102.sellyuserservice.domain.dto.UserDto;
import com.b102.sellyuserservice.domain.entity.UserEntity;
import com.b102.sellyuserservice.model.repository.UserRepository;
import com.b102.sellyuserservice.vo.RequestUpdate;
import com.b102.sellyuserservice.vo.RequestUser;
import com.b102.sellyuserservice.vo.SearchUserResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

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
  public UserDto createUser(UserDto userDto) throws UnsupportedEncodingException {
    ModelMapper mapper = new ModelMapper();
    mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
    UserEntity userEntity = mapper.map(userDto, UserEntity.class); // UserDto Type을 UserEntity Type으로 변경
    Base64.Encoder encoder = Base64.getEncoder();
    String encodeImg = null;
    String encodeBanner = null;
    byte[] imageEncode =  encoder.encode(userDto.getImage().getBytes());
    byte[] bannerEncode =  encoder.encode(userDto.getBanner().getBytes());
    encodeImg = new String(imageEncode, "UTF-8");
    encodeBanner = new String(bannerEncode, "UTF-8");
    userEntity.setImage(encodeImg);
    userEntity.setBanner(encodeBanner);
    userEntity.setEncryptedPwd(passwordEncoder.encode(userDto.getPwd()));
    userRepository.save(userEntity);
    System.out.println(userEntity);
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

  @Override
  public UserDto getUserDetailsByWallet(String wallet) {
    UserEntity userEntity = userRepository.findByWallet(wallet);
    if (userEntity == null){
      throw new UsernameNotFoundException("해당 유저가 없습니다.");
    }
    return new ModelMapper().map(userEntity, UserDto.class);
  }

  @Override
  public UserDto updateUser(Long userId, RequestUpdate user) throws UnsupportedEncodingException {
    UserEntity userEntity = userRepository.findByUserId(userId);
    Base64.Encoder encoder = Base64.getEncoder();
    String encodeImg = null;
    String encodeBanner = null;
    byte[] imageEncode =  encoder.encode(user.getImage().getBytes());
    byte[] bannerEncode =  encoder.encode(user.getBanner().getBytes());
    encodeImg = new String(imageEncode, "UTF-8");
    encodeBanner = new String(bannerEncode, "UTF-8");
    userEntity.setBanner(encodeImg);
    userEntity.setImage(encodeBanner);
    userEntity.setIntroduction(user.getIntroduction());
    userEntity.setNickname(user.getNickname());
    userRepository.save(userEntity);
    ModelMapper mapper = new ModelMapper();
    return mapper.map(userEntity, UserDto.class);
  }

  @Override
  public List<SearchUserResponse> findByKeyword(String keyword) {
    List<SearchUserResponse> userResponseList = new ArrayList<>();
    List<UserEntity> articleList = userRepository.findAllByNickname(keyword);
    articleList.forEach( v -> {
      userResponseList.add(new ModelMapper().map(v, SearchUserResponse.class));
    });
    return userResponseList;
  }
}
