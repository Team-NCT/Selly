package com.b102.sellyuserservice.model.repository;

import com.b102.sellyuserservice.domain.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<UserEntity, Long> {
  UserEntity findByUserId(Long userId);

  UserEntity findByWallet(String wallet);

  List<UserEntity> findAllByNickname(String keyword);
}
