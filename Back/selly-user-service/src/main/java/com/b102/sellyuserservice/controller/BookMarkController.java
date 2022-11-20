package com.b102.sellyuserservice.controller;

import com.b102.sellyuserservice.domain.entity.BookMark;
import com.b102.sellyuserservice.model.service.BookMarkService;
import com.b102.sellyuserservice.vo.ArticleResponse;
import com.b102.sellyuserservice.vo.BookMarkRequest;
import com.b102.sellyuserservice.vo.BookMarkResponse;
import com.b102.sellyuserservice.vo.ResponseMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Path;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
@RequestMapping("/")
@RestController
public class BookMarkController {

  private final BookMarkService bookMarkService;

  // 북마크 등록
  @PostMapping("/bookmark")
  public ResponseEntity<BookMarkResponse> createBookMark(@RequestBody BookMarkRequest bookMarkRequest) {
    BookMarkResponse bookMarkResponse = bookMarkService.createBoomMark(bookMarkRequest);
    if (bookMarkResponse != null){
      return ResponseEntity.status(HttpStatus.CREATED).body(bookMarkResponse);
    }else{
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

  }
  // 북마크 해제
  @DeleteMapping("/bookmark")
  public ResponseMessage deleteBookMark(@RequestBody BookMarkRequest bookMarkRequest) {
    return bookMarkService.deleteBookMark(bookMarkRequest);
  }
  // 북마크 리스트 조회
  @GetMapping("/bookmark/{userId}")
  public ResponseEntity<List<ArticleResponse>> findBookMark(@PathVariable("userId") Long userId) {
    List<ArticleResponse> bookMarkResponseList = bookMarkService.getBookMark(userId);
    return ResponseEntity.ok().body(bookMarkResponseList);
  }

  @GetMapping("/bookmark/{articleId}/{userId}")
  public Boolean bookMarkCheck(@PathVariable("articleId") Long articleId, @PathVariable("userId") Long userId){
    BookMark bookMark = bookMarkService.checkBookMark(articleId, userId);
    if (bookMark != null){
      return true;
    }
    else{
      return false;
    }
  }
}
