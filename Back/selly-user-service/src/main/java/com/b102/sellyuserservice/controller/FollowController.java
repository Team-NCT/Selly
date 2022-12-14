package com.b102.sellyuserservice.controller;

import com.b102.sellyuserservice.domain.dto.FollowDto;
import com.b102.sellyuserservice.domain.dto.UserDto;
import com.b102.sellyuserservice.domain.entity.FollowEntity;
import com.b102.sellyuserservice.model.service.FollowService;
import com.b102.sellyuserservice.model.service.UserService;
import com.b102.sellyuserservice.vo.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@Slf4j
public class FollowController {
  private final FollowService followService;
  private final UserService userService;

  @PostMapping("/follow")
  public ResponseEntity<ResponseFollow> createFollow(@RequestBody RequestFollow requestFollow){
    ModelMapper mapper = new ModelMapper();
    mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
    if (Objects.equals(requestFollow.getFollowerId(), requestFollow.getFollowingId())){
      ResponseFollow responseFollow = new ResponseFollow();
      responseFollow.setCode("400 Bad Request");
      responseFollow.setMessage("잘못된 요청입니다.");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseFollow);
    }
    FollowDto followDto = mapper.map(requestFollow, FollowDto.class);
    FollowDto returnValue = followService.followLike(followDto);
    if (returnValue == null){
      ResponseFollow responseFollow = new ResponseFollow();
      responseFollow.setCode("400 Bad Request");
      responseFollow.setMessage("이미 팔로워하고있습니다..");
      return ResponseEntity.status(HttpStatus.CREATED).body(responseFollow);
    }
    ResponseFollow responseFollow = mapper.map(returnValue, ResponseFollow.class);
    return ResponseEntity.status(HttpStatus.CREATED).body(responseFollow);


  }

  @DeleteMapping("follow")
  public ResponseMessage deleteFollow(@RequestBody RequestFollow requestFollow){
    ModelMapper mapper = new ModelMapper();
    mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
    return followService.followUnLike(requestFollow);
  }

  @GetMapping("follower/{followerId}")
  public ResponseEntity<List<ResponseFollowerUser>> searchMyFollower(@RequestHeader("userId") Long userId, @PathVariable("followerId") Long followerId, @RequestParam Long lastFollowingId){
    List<FollowEntity> followList = followService.myFollowerDetail(followerId, lastFollowingId);

    List<ResponseFollowerUser> result = new ArrayList<>();
    followList.forEach(v -> {
      UserDto userDto = userService.getUserByUserId(v.getFollowingId());
      if(userDto.getImage() != null){
        byte[] imageDecode = Base64.getDecoder().decode(userDto.getImage());
        userDto.setImage(new String(imageDecode, StandardCharsets.UTF_8));
      } else if (userDto.getImage() == null){
        userDto.setImage("default");
      }

      ResponseFollowerUser responseFollowerUser = new ModelMapper().map(userDto, ResponseFollowerUser.class);
      responseFollowerUser.setMyFollowing(followService.myFollowingCheck(v.getFollowingId(), userId));
      result.add(responseFollowerUser);
    });
    return ResponseEntity.status(HttpStatus.OK).body(result);
  }

  @GetMapping("following/{followingId}")
  public ResponseEntity<List<ResponseFollowingUser>> searchMyFollowing(@RequestHeader("userId") Long userId, @PathVariable("followingId") Long followingId, @RequestParam Long lastFollowerId){
    List<FollowEntity> followList = followService.myFollowingDetail(followingId, lastFollowerId);

    List<ResponseFollowingUser> result = new ArrayList<>();
    followList.forEach(v -> {
      UserDto userDto = userService.getUserByUserId(v.getFollowerId());
      if(userDto.getImage() != null){
        byte[] imageDecode = Base64.getDecoder().decode(userDto.getImage());
        userDto.setImage(new String(imageDecode, StandardCharsets.UTF_8));
      } else if (userDto.getImage() == null){
        userDto.setImage("default");
      }
      ResponseFollowingUser responseFollowingUser = new ModelMapper().map(userDto, ResponseFollowingUser.class);
      responseFollowingUser.setMyFollowing(followService.myFollowerCheck(v.getFollowerId(), userId));
      result.add(responseFollowingUser);
    });
    return ResponseEntity.status(HttpStatus.OK).body(result);
  }
}
