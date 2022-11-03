package com.b102.sellyuserservice.model.repository;

import com.b102.sellyuserservice.domain.entity.NftPiece;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NftPieceRepository extends JpaRepository<NftPiece, Long> {
  NftPiece findByUserIdAndArticleId(Long userId, Long articleId);
}
