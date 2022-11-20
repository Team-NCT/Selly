package com.b102.sellyuserservice.controller;

import com.b102.sellyuserservice.model.repository.UserRepository;
import com.b102.sellyuserservice.model.service.UserService;
import com.b102.sellyuserservice.vo.SocialProof;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/proof")
@RequiredArgsConstructor
@Slf4j
public class ProofController {

  private final UserRepository userRepository;

  @GetMapping("/all")
  public SocialProof socialProof(){
    SocialProof socialProof = new SocialProof();
    socialProof.setTotalUsers(855);
    socialProof.setTotalNft(1450);
    socialProof.setTotalAuctionAmount(200);
    socialProof.setTotalTransactionAmount(600);
    return socialProof;
  }
}
