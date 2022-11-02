package com.b102.sellyuserservice.controller;

import com.b102.sellyuserservice.domain.dto.FollowDto;
import com.b102.sellyuserservice.domain.dto.UserDto;
import com.b102.sellyuserservice.domain.entity.FollowEntity;
import com.b102.sellyuserservice.model.service.FollowService;
import com.b102.sellyuserservice.model.service.UserService;
import com.b102.sellyuserservice.vo.RequestFollow;
import com.b102.sellyuserservice.vo.ResponseFollow;
import com.b102.sellyuserservice.vo.ResponseFollowerUser;
import com.b102.sellyuserservice.vo.ResponseMessage;
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
    ResponseFollow responseFollow = mapper.map(returnValue, ResponseFollow.class);

    return ResponseEntity.status(HttpStatus.CREATED).body(responseFollow);
  }

  @DeleteMapping("follow")
  public ResponseMessage deleteFollow(@RequestBody RequestFollow requestFollow){
    ModelMapper mapper = new ModelMapper();
    mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
//    ResponseMessage returnValue = followService.followUnLike(followDto);
//    return returnValue; 아래와 같음
    return followService.followUnLike(requestFollow);
  }

  @GetMapping("follower/{userId}")
  public ResponseEntity<List<ResponseFollowerUser>> searchMyFollower(@PathVariable("userId") Long userId, @RequestParam Long lastFollowingId){
    List<FollowEntity> followList = followService.myFollowerDetail(userId, lastFollowingId);

    List<ResponseFollowerUser> result = new ArrayList<>();
    followList.forEach(v -> {
      UserDto userDto = userService.getUserByUserId(v.getFollowingId());
      byte[] imageDecode = Base64.getDecoder().decode(userDto.getImage());
      userDto.setImage(new String(imageDecode, StandardCharsets.UTF_8));
      ResponseFollowerUser responseFollowerUser = new ModelMapper().map(userDto, ResponseFollowerUser.class);
      result.add(responseFollowerUser);
    });
    return ResponseEntity.status(HttpStatus.OK).body(result);
  }
}
