package com.nct.sellyarticleservice.model.repository;



import com.nct.sellyarticleservice.domain.entity.Auction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuctionRepository extends JpaRepository<Auction, Long> {
  List<Auction> findByArticleId(Long articleId);
  Auction findByAuctionId(Long auctionId);
}
