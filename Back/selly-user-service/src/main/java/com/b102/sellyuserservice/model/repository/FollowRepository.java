package com.b102.sellyuserservice.model.repository;

import com.b102.sellyuserservice.domain.entity.FollowEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends CrudRepository<FollowEntity, Long> {
  FollowEntity findByFollowerIdAndFollowingId(Long followerId, Long followingId);
  Long countByFollowerId(Long followerId);
  Long countByFollowingId(Long followingId);
  List<FollowEntity> findByFollowerId(Long followerId);
  List<FollowEntity> findByFollowerIdAndFollowingIdLessThanOrderByFollowingIdDesc(Long followerId,Long followingId, Pageable pageable);
}
