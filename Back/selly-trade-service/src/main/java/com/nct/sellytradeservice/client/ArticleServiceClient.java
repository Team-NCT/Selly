package com.nct.sellytradeservice.client;

import com.nct.sellytradeservice.domain.dto.*;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.core.Response;

@FeignClient(name = "selly-article-service")
public interface ArticleServiceClient {
  @PostMapping("/selly-article-service/{articleId}")
//  void sellRegist(@RequestBody ArticleUpdateRequest articleUpdateRequest, @PathVariable("id") Long id);
  void sellRegist(@PathVariable("articleId") Long articleId);

  @GetMapping("/selly-article-service/{articleId}")
//  Object articleResponse(@PathVariable("id") Long id);
  ArticleResponseDto articleResponse(@PathVariable("articleId") Long articleId, @RequestParam("userId")Long userId);

  // 작품 번호 가져오는 API
  @GetMapping("/selly-article-service/searchId/{contractAddress}/{tokenId}")
  ResponseArticleId responseArticleId(@PathVariable("contractAddress") String contractAddress, @PathVariable("tokenId") String tokenId);

  @PostMapping("/selly-article-service/create/nominting")
  ResponseArticleId aricleCreateNoMinting(@RequestBody RequestArticleNoMinting requestArticleNoMinting);

  // 판매 등록 후 call 작품 정보 수정
  @PostMapping("/selly-article-service/{articleId}")
  ResponseEntity<String> response(@RequestBody ArticleUpdateRequest articleUpdateRequest, @PathVariable("articleId") Long articleId);


  @PutMapping("/selly-article-service/article-availability")
  void articleAvailability(@RequestBody ResponseArticleUpdate responseArticleUpdate);

}
