package com.b102.sellyuserservice.model.repository;

import com.b102.sellyuserservice.domain.dto.NftPieceDto;
import com.b102.sellyuserservice.domain.entity.NftPiece;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NftPieceRepository extends JpaRepository<NftPiece, Long> {
  Optional<NftPiece> findByUserIdAndArticleId(Long userId, Long articleId);

  Integer countByUserId(Long userId);
}
