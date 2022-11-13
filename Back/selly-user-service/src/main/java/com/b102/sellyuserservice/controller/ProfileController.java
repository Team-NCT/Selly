package com.b102.sellyuserservice.controller;

import com.b102.sellyuserservice.model.service.ProfileService;
import com.b102.sellyuserservice.vo.ArticleResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/profile")
@RestController
public class ProfileController {

  private final ProfileService profileService;

  // 유저가 생성한 작품리스트 조회
  @GetMapping("/user-created/{userId}")
  public ResponseEntity<List<ArticleResponse>> userCreatedArticleList(@PathVariable("userId") Long userId) {
    List<ArticleResponse> responses = profileService.findUserCreatedArticleList(userId);
    return ResponseEntity.ok().body(responses);
  }

  // 유저가 판매중인 작품리스트 조회
  @GetMapping("/user-forSale/{userId}")
  public ResponseEntity<List<ArticleResponse>> userSaleArticleList(@PathVariable("userId") Long userId) {
    List<ArticleResponse> responses = profileService.findUserSaleArticleList(userId);
    return ResponseEntity.ok().body(responses);
  }

}
