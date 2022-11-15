package com.b102.sellyuserservice.controller;

import com.b102.sellyuserservice.domain.dto.FollowDto;
import com.b102.sellyuserservice.domain.dto.NftPieceDto;
import com.b102.sellyuserservice.domain.dto.UserDto;
import com.b102.sellyuserservice.domain.entity.NftPiece;
import com.b102.sellyuserservice.domain.entity.UserEntity;
import com.b102.sellyuserservice.model.service.FollowService;
import com.b102.sellyuserservice.model.service.NftPieceService;
import com.b102.sellyuserservice.model.service.UserService;

import com.b102.sellyuserservice.vo.*;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.ws.rs.core.Response;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@Slf4j // log를 쓰기 위한 어노테이션
public class UserController {

  private final UserService userService;
  private final NftPieceService nftPieceService;
  private final FollowService followService;
  private final Environment env;

  @PostMapping("/users")
  public ResponseEntity<ResponseUser> createUser(@RequestBody RequestUser user) throws UnsupportedEncodingException {
    ModelMapper mapper = new ModelMapper();
    mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

    UserDto userDto = mapper.map(user, UserDto.class);
    UserDto returnValue = userService.createUser(userDto);

    ResponseUser responseUser = mapper.map(returnValue, ResponseUser.class);
    if(responseUser.getImage() != null){
      byte[] imageDecode = Base64.getDecoder().decode(responseUser.getImage());
      responseUser.setImage(new String(imageDecode, StandardCharsets.UTF_8));
    } else if(responseUser.getImage() == null){
      responseUser.setImage("default");
    }

    if(responseUser.getBanner() != null){
      byte[] bannerDecode = Base64.getDecoder().decode(responseUser.getBanner());
      responseUser.setBanner(new String(bannerDecode, StandardCharsets.UTF_8));
    } else if(responseUser.getBanner() == null){
      responseUser.setBanner("default");
    }
    return ResponseEntity.status(HttpStatus.CREATED).body(responseUser);
  }

  @GetMapping("/users")
  public ResponseEntity<List<ResponseUser>> getUsers() {
    Iterable<UserEntity> userList = userService.getUserByAll();

    List<ResponseUser> result = new ArrayList<>();
    userList.forEach(v -> {
      if(v.getImage() != null){
        byte[] imageDecode = Base64.getDecoder().decode(v.getImage());
        v.setImage(new String(imageDecode, StandardCharsets.UTF_8));
      } else if (v.getImage() == null){
        v.setImage("default");
      }

      if(v.getBanner() != null){
        byte[] bannerDecode = Base64.getDecoder().decode(v.getBanner());
        v.setBanner(new String(bannerDecode, StandardCharsets.UTF_8));
      } else if (v.getBanner() == null){
        v.setBanner("default");
      }

      ResponseUser responseUser = new ModelMapper().map(v, ResponseUser.class);
      Long myFollowerCnt = followService.followerCount(responseUser.getUserId());
      Long myFollowingCnt = followService.followingCount(responseUser.getUserId());
      responseUser.setFollowerCnt(myFollowerCnt);
      responseUser.setFollowingCnt(myFollowingCnt);
      result.add(responseUser);
    });

    return ResponseEntity.status(HttpStatus.OK).body(result);
  }

  @GetMapping("/users/{userId}")
  public ResponseEntity<ResponseUser> getUser(@PathVariable("userId") Long userId) throws UnsupportedEncodingException {
    UserDto userDto = userService.getUserByUserId(userId);

    ResponseUser returnValue = new ModelMapper().map(userDto, ResponseUser.class);
    if(returnValue.getImage() != null){
      byte[] imageDecode = Base64.getDecoder().decode(returnValue.getImage());
      returnValue.setImage(new String(imageDecode, StandardCharsets.UTF_8));
    } else if (returnValue.getImage() == null){
      returnValue.setImage("default");
    }

    if (returnValue.getBanner() != null){
      byte[] bannerDecode = Base64.getDecoder().decode(returnValue.getBanner());
      returnValue.setBanner(new String(bannerDecode, StandardCharsets.UTF_8));
    } else if (returnValue.getBanner() == null){
      returnValue.setBanner("default");
    }
    Long myFollowerCnt = followService.followerCount(userId);
    Long myFollowingCnt = followService.followingCount(userId);
    returnValue.setFollowerCnt(myFollowerCnt);
    returnValue.setFollowingCnt(myFollowingCnt);
    return ResponseEntity.status(HttpStatus.OK).body(returnValue);
  }

  @GetMapping("/users/{profileId}/{userId}")
  public ResponseEntity<ResponseUser> getOtherUser(@PathVariable("profileId") Long profileId, @PathVariable("userId") Long userId) throws UnsupportedEncodingException {
    UserDto userDto = userService.getUserByUserId(profileId);

    ResponseUser returnValue = new ModelMapper().map(userDto, ResponseUser.class);
    if(returnValue.getImage() != null){
      byte[] imageDecode = Base64.getDecoder().decode(returnValue.getImage());
      returnValue.setImage(new String(imageDecode, StandardCharsets.UTF_8));
    } else if (returnValue.getImage() == null){
      returnValue.setImage("default");
    }

    if (returnValue.getBanner() != null){
      byte[] bannerDecode = Base64.getDecoder().decode(returnValue.getBanner());
      returnValue.setBanner(new String(bannerDecode, StandardCharsets.UTF_8));
    } else if (returnValue.getBanner() == null){
      returnValue.setBanner("default");
    }
    Long myFollowerCnt = followService.followerCount(profileId);
    Long myFollowingCnt = followService.followingCount(profileId);
    returnValue.setFollowerCnt(myFollowerCnt);
    returnValue.setFollowingCnt(myFollowingCnt);
    Boolean myFollowing =  followService.myFollowingCheck(profileId, userId);
    returnValue.setMyFollowing(myFollowing);
    return ResponseEntity.status(HttpStatus.OK).body(returnValue);
  }

  @PutMapping("/users/{userId}")
  public ResponseEntity<ResponseUser> updateUser(@PathVariable("userId") Long userId, @RequestBody RequestUpdate user) throws UnsupportedEncodingException {
    UserDto userDto = userService.updateUser(userId, user);
    ResponseUser returnValue = new ModelMapper().map(userDto, ResponseUser.class);
    if(returnValue.getImage() != null){
      byte[] imageDecode = Base64.getDecoder().decode(returnValue.getImage());
      returnValue.setImage(new String(imageDecode, StandardCharsets.UTF_8));
    } else if (returnValue.getImage() == null){
      returnValue.setImage("default");
    }

    if (returnValue.getBanner() != null){
      byte[] bannerDecode = Base64.getDecoder().decode(returnValue.getBanner());
      returnValue.setBanner(new String(bannerDecode, StandardCharsets.UTF_8));
    } else if (returnValue.getBanner() == null){
      returnValue.setBanner("default");
    }
    return ResponseEntity.status(HttpStatus.OK).body(returnValue);
  }

  @GetMapping("/search/{keyword}")
  public List<SearchUserResponse> userSearch(@PathVariable("keyword") String keyword) {
    return userService.findByKeyword(keyword);
  }

  @GetMapping("/nicknameCheck/{nickname}")
  public String nicknameCheck(@PathVariable("nickname") String nickname){
    return userService.findByNickname(nickname);
  }
}
