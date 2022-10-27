package com.nct.sellyarticleservice.controller;

import com.nct.sellyarticleservice.domain.dto.ArticleRequest;
import com.nct.sellyarticleservice.domain.entity.Article;
import com.nct.sellyarticleservice.model.service.ArticleService;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.bridge.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;

@RestController
@RequestMapping("/selly-article-service")
@Slf4j
public class ArticleController {

  @Autowired
  ArticleService articleService;

  @PostMapping("/create")
//  public ResponseEntity<Object> createArticle(@RequestBody Article article) throws SQLException{
//    Message message = articleService.createArticle(article);
////    return new ResponseEntity<Message>(message, HttpStatus.OK);
//    return ResponseEntity.ok()
//            .body(message);
//  }
  public ResponseEntity<Object> createArticle(@RequestBody ArticleRequest articleRequest) throws SQLException{
    Message message = articleService.createArticle(articleRequest);
//    return new ResponseEntity<Message>(message, HttpStatus.OK);
    return ResponseEntity.ok()
            .body(message);
  }

}
