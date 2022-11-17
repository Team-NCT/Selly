package com.b102.sellyuserservice.model.repository;

import com.b102.sellyuserservice.domain.dto.NftPieceDto;
import com.b102.sellyuserservice.domain.entity.NftPiece;
import com.b102.sellyuserservice.vo.ArticleResponse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NftPieceRepository extends JpaRepository<NftPiece, Long> {
  Optional<NftPiece> findByUserIdAndArticleId(Long userId, Long articleId);

  Integer countByUserIdAndArticleId(Long userId, Long articleId);

  List<NftPiece> findByUserIdAndArticleIdAndTrade(Long userId, Long articleId, boolean b);

  List<NftPiece> findByUserId(Long userId);

  NftPiece findByArticleId(Long articleId);
}
