package com.b102.sellyuserservice.domain.entity;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "follow")
@EntityListeners(value= AuditingEntityListener.class)
public class FollowEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long followId;

  @Column(nullable = false)
  private Long followerId;

  @Column(nullable = false)
  private Long followingId;

  @Column(updatable = false)
  @CreatedDate
  private LocalDateTime createRegist;
  @LastModifiedDate
  private LocalDateTime updateRegist;
}
