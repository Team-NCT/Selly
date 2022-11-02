package com.b102.sellyuserservice.domain.entity;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "users")@EntityListeners(value= AuditingEntityListener.class)
public
 class UserEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long userId;

  @Column(nullable = false, length = 150, unique = true)
  private String wallet;
  @Column(nullable = false, unique = true)
  private String encryptedPwd;
  @Column(nullable = false, length = 200)
  private String image;
  @Column(nullable = false, length = 200)
  private String banner;
  @Column(length = 200)
  private String introduction;
  @Column(length = 24, unique = true)
  private String nickname;
  @Column(updatable = false)
  @CreatedDate
  private LocalDateTime createRegist;
  @LastModifiedDate
  private LocalDateTime updateRegist;
  private boolean certification;
}
