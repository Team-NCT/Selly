package com.nct.Selly.domain.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Users {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long userId;

  private Integer wallet;

  private String image;

  private String banner;

  private String introduction;

  private String nickname;

  private Date createRegist;

  private Date updateRegist;

  @OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
  private List<Bookmark> bookmarkList = new ArrayList<>();

  @OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
  private List<Piece> pieceList = new ArrayList<>();

  @OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
  private List<TradeLog> tradeLogList = new ArrayList<>();

  @Builder
  public Users(Long userId, Integer wallet, String image, String banner, String introduction, String nickname, Date createRegist, Date updateRegist, List<Bookmark> bookmarkList, List<Piece> pieceList, List<TradeLog> tradeLogList) {
    this.userId = userId;
    this.wallet = wallet;
    this.image = image;
    this.banner = banner;
    this.introduction = introduction;
    this.nickname = nickname;
    this.createRegist = createRegist;
    this.updateRegist = updateRegist;
    this.bookmarkList = bookmarkList;
    this.pieceList = pieceList;
    this.tradeLogList = tradeLogList;
  }
}
