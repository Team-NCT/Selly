package com.b102.sellyuserservice.model.service;

import com.b102.sellyuserservice.vo.ArticleResponse;
import com.b102.sellyuserservice.vo.BookMarkRequest;
import com.b102.sellyuserservice.vo.BookMarkResponse;
import com.b102.sellyuserservice.vo.ResponseMessage;

import java.util.List;

public interface BookMarkService {
  BookMarkResponse createBoomMark(BookMarkRequest bookMarkRequest);

  ResponseMessage deleteBookMark(BookMarkRequest bookMarkRequest);

  List<ArticleResponse> getBookMark(Long userId);
}
