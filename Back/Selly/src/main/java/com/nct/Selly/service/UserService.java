package com.nct.Selly.service;



import com.nct.Selly.domain.entity.Users;
import com.nct.Selly.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class UserService {
  @Autowired
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  @Transactional
  public void signUpUser(Users users){
    String wallet = users.getWallet();
    users.setWallet(passwordEncoder.encode(wallet));
    userRepository.save(users);
  }
}