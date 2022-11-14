package com.nct.sellyarticleservice.domain.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "auction")@EntityListeners(value= AuditingEntityListener.class)
public class Auction {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long auctionId;

  private Long articleId;

  private Long seller;

  private Long buyer;

  private double price;

  private double lowPrice;

  @Column(updatable = false)
  @CreatedDate
  private LocalDateTime createRegist;
  @LastModifiedDate
  private LocalDateTime updateRegist;

  private LocalDateTime auctionStart;

  private Boolean auctionState;
}
