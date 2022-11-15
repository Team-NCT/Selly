package com.b102.sellyuserservice.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
@Getter
@EntityListeners(value = AuditingEntityListener.class)
@Entity
@NoArgsConstructor
public class BookMark {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long bookMarkId;
  private Long userId;
  private Long articleId;
  @CreatedDate
  private LocalDateTime bookMarkRegistTime;
  @LastModifiedDate
  private LocalDateTime bookMarkUpdateTime;

  @Builder
  public BookMark(Long userId, Long articleId) {
    this.userId = userId;
    this.bookMarkId = articleId;
  }
}
