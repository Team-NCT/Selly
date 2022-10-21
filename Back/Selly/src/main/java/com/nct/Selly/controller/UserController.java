package com.nct.Selly.controller;

import com.nct.Selly.domain.entity.Users;
import com.nct.Selly.repository.UserRepository;
import com.nct.Selly.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

  @Autowired
  UserService userService;

  @PostMapping("/join")
  public String join(@RequestBody Users users){
    userService.signUpUser(users);
    return "회원가입을 축하드립니다.";
  }
}
