package com.b102.sellyuserservice.model.service;

import com.b102.sellyuserservice.domain.dto.FollowDto;
import com.b102.sellyuserservice.domain.entity.FollowEntity;
import com.b102.sellyuserservice.model.repository.FollowRepository;
import com.b102.sellyuserservice.vo.RequestFollow;
import com.b102.sellyuserservice.vo.ResponseMessage;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService{
  private final FollowRepository followRepository;
  @Override
  public FollowDto followLike(FollowDto followDto) {
    ModelMapper mapper = new ModelMapper();
    mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
    FollowEntity followEntity = followRepository.findByFollowerIdAndFollowingId(followDto.getFollowerId(), followDto.getFollowingId());
    if (followEntity != null){
      return null;
    }
    FollowEntity saveData = mapper.map(followDto, FollowEntity.class);
    followRepository.save(saveData);
    return mapper.map(saveData, FollowDto.class);
  }

  @Override
  public ResponseMessage followUnLike(RequestFollow requestFollow) {
    ModelMapper mapper = new ModelMapper();
    mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
    FollowEntity followEntity = followRepository.findByFollowerIdAndFollowingId(requestFollow.getFollowerId(), requestFollow.getFollowingId());
    ResponseMessage responseMessage = new ResponseMessage();
    if (followEntity == null){
      responseMessage.setCode("400");
      responseMessage.setMessage("잘못된 요청입니다.");
      return responseMessage;
    }
    followRepository.delete(followEntity);
    responseMessage.setCode("200");
    responseMessage.setMessage("성공적으로 삭제했습니다.");
    return responseMessage;
  }

  @Override
  public Long followerCount(Long followerId) {
    return followRepository.countByFollowerId(followerId);
  }

  @Override
  public Long followingCount(Long followingId) {
    return followRepository.countByFollowingId(followingId);
  }

  @Override
  public List<FollowEntity> myFollowerDetail(Long userId, Long lastFollowingId) {
    return followRepository.findByFollowerIdAndFollowingIdLessThanOrderByFollowingIdDesc(userId, lastFollowingId, PageRequest.of(0, 5));
  }

  @Override
  public List<FollowEntity> myFollowingDetail(Long userId, Long lastFollowerId) {
    return followRepository.findByFollowingIdAndFollowerIdLessThanOrderByFollowerIdDesc(userId, lastFollowerId, PageRequest.of(0, 5));
  }

  @Override
  public Boolean myFollowingCheck(Long followerId, Long followingId) {
    FollowEntity followEntity = followRepository.findByFollowerIdAndFollowingId(followerId, followingId);
    if (followEntity == null){
      return false;
    }
    else{
      return true;
    }
  }

  @Override
  public Boolean myFollowerCheck(Long followingId, Long followerId) {
    FollowEntity followEntity = followRepository.findByFollowerIdAndFollowingId(followingId, followerId);
    if (followEntity == null){
      return false;
    }
    else{
      return true;
    }
  }
}
