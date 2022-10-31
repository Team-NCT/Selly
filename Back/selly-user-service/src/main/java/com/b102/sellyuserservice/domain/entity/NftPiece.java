package com.b102.sellyuserservice.domain.entity;

import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Data
@Entity
@EntityListeners(value= AuditingEntityListener.class)
public class NftPiece {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long pieceId;

  private 
}
