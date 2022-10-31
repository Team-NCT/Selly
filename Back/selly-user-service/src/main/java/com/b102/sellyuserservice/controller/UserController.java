package com.b102.sellyuserservice.controller;

import com.b102.sellyuserservice.domain.dto.UserDto;
import com.b102.sellyuserservice.domain.entity.UserEntity;
import com.b102.sellyuserservice.model.service.UserService;
import com.b102.sellyuserservice.vo.RequestUpdate;
import com.b102.sellyuserservice.vo.RequestUser;
import com.b102.sellyuserservice.vo.ResponseUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.core.Response;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@Slf4j // log를 쓰기 위한 어노테이션
public class UserController {

  private final UserService userService;
  private final Environment env;

  @PostMapping("/users")
  public ResponseEntity<ResponseUser> createUser(@RequestBody RequestUser user) throws UnsupportedEncodingException {
    System.out.println(user);
    ModelMapper mapper = new ModelMapper();
    mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

    UserDto userDto = mapper.map(user, UserDto.class);
    UserDto returnValue = userService.createUser(userDto);

    ResponseUser responseUser = mapper.map(returnValue, ResponseUser.class);
    byte[] imageDecode = Base64.getDecoder().decode(responseUser.getImage());
    byte[] bannerDecode = Base64.getDecoder().decode(responseUser.getBanner());
    responseUser.setImage(new String(imageDecode, StandardCharsets.UTF_8));
    responseUser.setBanner(new String(bannerDecode, StandardCharsets.UTF_8));

    return ResponseEntity.status(HttpStatus.CREATED).body(responseUser);
  }

  @GetMapping("/users")
  public ResponseEntity<List<ResponseUser>> getUsers() {
    Iterable<UserEntity> userList = userService.getUserByAll();

    List<ResponseUser> result = new ArrayList<>();
    userList.forEach(v -> {
      byte[] imageDecode = Base64.getDecoder().decode(v.getImage());
      byte[] bannerDecode = Base64.getDecoder().decode(v.getBanner());
      v.setImage(new String(imageDecode, StandardCharsets.UTF_8));
      v.setBanner(new String(bannerDecode, StandardCharsets.UTF_8));
      result.add(new ModelMapper().map(v, ResponseUser.class));
    });

    return ResponseEntity.status(HttpStatus.OK).body(result);
  }

  @GetMapping("/users/{userId}")
  public ResponseEntity<ResponseUser> getUser(@PathVariable("userId") Long userId) throws UnsupportedEncodingException {
    UserDto userDto = userService.getUserByUserId(userId);

    ResponseUser returnValue = new ModelMapper().map(userDto, ResponseUser.class);
    byte[] imageDecode = Base64.getDecoder().decode(returnValue.getImage());
    byte[] bannerDecode = Base64.getDecoder().decode(returnValue.getBanner());
    returnValue.setImage(new String(imageDecode, StandardCharsets.UTF_8));
    returnValue.setBanner(new String(bannerDecode, StandardCharsets.UTF_8));
    return ResponseEntity.status(HttpStatus.OK).body(returnValue);
  }

  @PutMapping("/users/{userId}")
  public ResponseEntity<ResponseUser> updateUser(@PathVariable("userId") Long userId, @RequestBody RequestUpdate user) throws UnsupportedEncodingException {
    UserDto userDto = userService.updateUser(userId, user);
    ResponseUser returnValue = new ModelMapper().map(userDto, ResponseUser.class);
    byte[] imageDecode = Base64.getDecoder().decode(returnValue.getImage());
    byte[] bannerDecode = Base64.getDecoder().decode(returnValue.getBanner());
    returnValue.setImage(new String(imageDecode, StandardCharsets.UTF_8));
    returnValue.setBanner(new String(bannerDecode, StandardCharsets.UTF_8));
    return ResponseEntity.status(HttpStatus.OK).body(returnValue);

  }


}
