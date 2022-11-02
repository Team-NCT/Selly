package com.b102.sellyuserservice.model.service;

import com.b102.sellyuserservice.domain.dto.FollowDto;
import com.b102.sellyuserservice.domain.entity.FollowEntity;
import com.b102.sellyuserservice.vo.RequestFollow;
import com.b102.sellyuserservice.vo.ResponseMessage;
import org.springframework.stereotype.Component;

import javax.ws.rs.core.Response;
import java.util.List;

@Component
public interface FollowService {
  FollowDto followLike(FollowDto followDto);
  ResponseMessage followUnLike(RequestFollow requestFollow);
  Long followerCount(Long followerId);
  Long followingCount(Long followingId);
  List<FollowEntity> myFollowerDetail(Long userId, Long lastFollowingId);
}
