package com.nct.Selly.domain.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Bookmark {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long bookmarkId;

  private Date createRegist;

  private Date updateRegist;

  @ManyToOne
  private Users userId;

  @ManyToOne
  private Article articleId;

  @Builder
  public Bookmark (Long bookmarkId, Date createRegist, Date updateRegist, Users userId, Article articleId) {
    this.bookmarkId = bookmarkId;
    this.createRegist = createRegist;
    this.updateRegist = updateRegist;
    this.userId = userId;
    this.articleId = articleId;
  }
}
