package com.b102.sellyuserservice.controller;

import com.b102.sellyuserservice.vo.AuthorRankingResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

  @GetMapping("/total")
  public ResponseEntity<List<AuthorRankingResponse>> totalAuthorRanking() {
    List<AuthorRankingResponse> authorRankingResponseList = new ArrayList<>();
    AuthorRankingResponse authorRankingResponse = AuthorRankingResponse.builder()
            .userId(1L)
            .nickname("nickname")
            .image("https://skywalker.infura-ipfs.io/ipfs/QmP5VS1uroszxVxWk5Xsa9nGVnpiNaF4ZAkhLjszkSzY4R")
            .wallet("wallet")
            .followerCnt(17)
            .nftCnt(1)
            .certification(true)
            .build();
    authorRankingResponseList.add(authorRankingResponse);
    return ResponseEntity.ok().body(authorRankingResponseList);
  }

  @GetMapping("/trend")
  public ResponseEntity<List<AuthorRankingResponse>> trandingAuthorRanking() {
    List<AuthorRankingResponse> authorRankingResponseList = new ArrayList<>();
    AuthorRankingResponse authorRankingResponse = AuthorRankingResponse.builder()
            .userId(1L)
            .nickname("nickname")
            .image("https://skywalker.infura-ipfs.io/ipfs/QmP5VS1uroszxVxWk5Xsa9nGVnpiNaF4ZAkhLjszkSzY4R")
            .wallet("wallet")
            .followerCnt(17)
            .nftCnt(1)
            .certification(true)
            .build();
    authorRankingResponseList.add(authorRankingResponse);
    return ResponseEntity.ok().body(authorRankingResponseList);
  }
}
