package com.b102.sellyuserservice.model.service;

import com.b102.sellyuserservice.client.ArticleServiceClient;
import com.b102.sellyuserservice.domain.entity.BookMark;
import com.b102.sellyuserservice.model.repository.BookMarkRepository;
import com.b102.sellyuserservice.vo.ArticleResponse;
import com.b102.sellyuserservice.vo.BookMarkRequest;
import com.b102.sellyuserservice.vo.BookMarkResponse;
import com.b102.sellyuserservice.vo.ResponseMessage;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class BookMarkServiceImpl implements BookMarkService{
  private final BookMarkRepository bookMarkRepository;
  private final ArticleServiceClient articleServiceClient;
  private final ModelMapper mapper = new ModelMapper();

  // 북마크 생성
  @Override
  public BookMarkResponse createBoomMark(BookMarkRequest bookMarkRequest) {
    BookMark bookMark = BookMark.builder()
            .userId(bookMarkRequest.getUserId())
            .articleId(bookMarkRequest.getArticleId())
            .build();
    bookMarkRepository.save(bookMark);
    return mapper.map(bookMark, BookMarkResponse.class);
  }

  // 북마크 삭제
  @Override
  public ResponseMessage deleteBookMark(BookMarkRequest bookMarkRequest) {
    BookMark bookMark = bookMarkRepository.findByUserIdAndArticleId(bookMarkRequest.getUserId(), bookMarkRequest.getArticleId());
    ResponseMessage responseMessage = new ResponseMessage();
    if (bookMark == null) {
      responseMessage.setCode("400");
      responseMessage.setMessage("잘못된 요청입니다.");
      return responseMessage;
    }
    bookMarkRepository.delete(bookMark);
    responseMessage.setCode("200");
    responseMessage.setMessage("성공적으로 삭제했습니다.");
    return responseMessage;
  }

  // 특정 유저 북마크 리스트 조회
  @Override
  public List<ArticleResponse> getBookMark(Long userId) {
    // 유저가 등록한 모든 북마크 조회
    List<BookMark> bookMarkList = bookMarkRepository.findByUserId(userId);
    List<ArticleResponse> bookMarkResponseList = new ArrayList<>();
    // 각 북마크마다 api 조회요청을 통해서
    bookMarkList.forEach(v -> {
      ArticleResponse articleResponse = articleServiceClient.getArticle(v.getArticleId());
      ArticleResponse bookMarkedarticleResponse = ArticleResponse.builder()
              .articleId(articleResponse.getArticleId())
              .articleName(articleResponse.getArticleName())
              .articleImgUrl(articleResponse.getArticleImgUrl())
              .build();
      bookMarkResponseList.add(mapper.map(bookMarkedarticleResponse, ArticleResponse.class));
    });
    return bookMarkResponseList;
  }
}
