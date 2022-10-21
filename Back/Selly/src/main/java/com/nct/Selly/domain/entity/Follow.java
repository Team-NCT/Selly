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
public class Follow {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long followId;

  @ManyToOne
  Users followerId;

  @ManyToOne
  Users followingId;

  private Date createRegist;

  private Date updateRegist;

  @Builder
  public Follow (Long followId, Users followerId, Users followingId, Date createRegist, Date updateRegist) {
    this.followId = followId;
    this.followerId = followerId;
    this.followingId = followingId;
    this.createRegist = createRegist;
    this.updateRegist = updateRegist;
  }

}
