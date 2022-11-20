package com.nct.sellysearchservice.controller;

import com.nct.sellysearchservice.domain.ArticleResponseDto;
import com.nct.sellysearchservice.model.service.SearchService;
import com.nct.sellysearchservice.model.service.SearchServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/selly-search-service")
@Slf4j
public class SearchController {
  private final SearchService searchService;

  // 필터 컨트롤러
  @GetMapping("/filter")
  public ResponseEntity<List<Object>> filter(@RequestParam("sell") String sell, @RequestParam("auction") String auction) {
    List<Object> result = new ArrayList<>();
    return ResponseEntity.ok().body(result);
  }

  // 검색 컨트롤러
  @GetMapping("/search/{keyword}")
  public ResponseEntity<HashMap<String, Object>> getSearchResult(@PathVariable("keyword") String keyword) {
    HashMap<String, Object> result = searchService.getSearchResult(keyword);
    if (result != null){
      return ResponseEntity.status(HttpStatus.OK).body(result);
    }else {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
  }
}
