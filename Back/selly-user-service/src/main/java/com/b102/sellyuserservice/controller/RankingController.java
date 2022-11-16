package com.b102.sellyuserservice.controller;

import com.b102.sellyuserservice.model.service.UserService;
import com.b102.sellyuserservice.vo.AuthorRankingResponse;
import com.b102.sellyuserservice.vo.AuthorRankingTotalResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/ranking")
@RestController
public class RankingController {

  private final UserService userService;
  @GetMapping("/total")
  public ResponseEntity<List<AuthorRankingResponse>> totalAuthorRanking() {
    List<AuthorRankingResponse> authorRankingResponseList = userService.findByAllId();
    if (authorRankingResponseList != null){
      return ResponseEntity.status(HttpStatus.OK).body(authorRankingResponseList);
    } else{
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
  }

  @GetMapping("/trend")
  public ResponseEntity<List<AuthorRankingTotalResponse>> trandingAuthorRanking() {
    List<AuthorRankingTotalResponse> authorRankingTotalResponses = userService.userArticleRanking();
    if (authorRankingTotalResponses != null){
      return ResponseEntity.status(HttpStatus.OK).body(authorRankingTotalResponses);
    } else{
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
  }
}
