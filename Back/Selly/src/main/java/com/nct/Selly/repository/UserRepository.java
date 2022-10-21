package com.nct.Selly.repository;

import com.nct.Selly.domain.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<Users, String> {
  public Users findByWallet(String wallet);
}
