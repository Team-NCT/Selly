package com.nct.sellysearchservice.controller;

import com.nct.sellysearchservice.domain.ArticleResponseDto;
import com.nct.sellysearchservice.model.service.SearchServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/selly-search-service")
@Slf4j
public class SearchController {
  private final SearchServiceImpl searchService;

  @GetMapping("/filter")
  public ResponseEntity<List<Object>> filter(@RequestParam("sell") String sell, @RequestParam("auction") String auction) {

    List<Object> result = new ArrayList<>();
//    switch (sell) {
//      case "selling":
//        searchService.filter(sell)
//    }
//    result = searchService.filter(criterion);
    searchService(sell, auction);
    return ResponseEntity.ok().body(result);
  }
}
