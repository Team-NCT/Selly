package com.b102.sellyuserservice.controller;

import com.b102.sellyuserservice.model.service.ProfileService;
import com.b102.sellyuserservice.vo.ArticleResponse;
import com.b102.sellyuserservice.vo.FractionResponse;
import com.b102.sellyuserservice.vo.MarginResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/profile")
@RestController
public class ProfileController {

  private final ProfileService profileService;

  // 유저가 생성한 작품리스트 조회 (Profile-Created)
  @GetMapping("/user-created/{userId}")
  public ResponseEntity<List<ArticleResponse>> userCreatedArticleList(@PathVariable("userId") Long userId) {
    List<ArticleResponse> responses = profileService.findUserCreatedArticleList(userId);
    return ResponseEntity.ok().body(responses);
  }

  // 유저가 판매중인 작품리스트 조회 (Profile-ForSale)
  @GetMapping("/user-forSale/{userId}")
  public ResponseEntity<List<ArticleResponse>> userSaleArticleList(@PathVariable("userId") Long userId) {
//    List<ArticleResponse> responses = profileService.findUserSaleArticleList(userId);
    ArticleResponse articleResponse = ArticleResponse.builder()
            .articleName("articleName")
            .articleImgUrl("https://skywalker.infura-ipfs.io/ipfs/QmP5VS1uroszxVxWk5Xsa9nGVnpiNaF4ZAkhLjszkSzY4R")
            .articleId(1L)
            .build();
    List<ArticleResponse> responses = new ArrayList<>();
    responses.add(articleResponse);
    return ResponseEntity.ok().body(responses);
  }

  // 본인 조각 보기 (Profile - Fractions)
  @GetMapping("/user-fractions/{profileUserId}")
  public ResponseEntity<List<FractionResponse>> userFractionsList(@RequestHeader("userId") Long userId , @PathVariable("profileUserId") Long profileUserId) {
    List<FractionResponse> responses = profileService.getFraction(userId, profileUserId);
    return ResponseEntity.ok().body(responses);
  }

  // 내 수익보기
  @GetMapping("/margin")
  public ResponseEntity<MarginResponse> getMargin(@RequestHeader("userId") Long userId) {
    MarginResponse marginResponse = profileService.getMargin(userId);
    return ResponseEntity.ok().body(marginResponse);
  }





}
