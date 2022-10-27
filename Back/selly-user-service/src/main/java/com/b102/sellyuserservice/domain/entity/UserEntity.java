package com.b102.sellyuserservice.domain.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "users")
public class UserEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long userId;

  @Column(nullable = false, length = 150, unique = true)
  private String wallet;

  @Column(nullable = false, length = 200)
  private String image;
  @Column(nullable = false, length = 200)
  private String banner;
  @Column(length = 200)
  private String introduction;
  @Column(length = 24, unique = true)
  private String nickname;
  @Column(updatable = false)
  private Date createRegist;

  private Date updateRegist;

}
