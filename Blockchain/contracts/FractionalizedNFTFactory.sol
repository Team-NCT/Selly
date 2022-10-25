// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./fractionalizedNFT.sol";

contract FractionalizedNFTFactory is Ownable {
  // 분할된 NFT들의 컨트랙트 주소를 저장하는 배열
  address[] public fractionalizedNFTCAs;

  function Fractionalize(address NFTCA, uint256 tokenId, uint256 amount) 
    public 
    returns (address)
  {
    address fractionalizedNFTCA = address(
        new FractionalizedNFT(NFTCA, tokenId, amount, msg.sender)
    );
    fractionalizedNFTCAs.push(fractionalizedNFTCA);
 
    return fractionalizedNFTCA;
  }

  function allF_NFTCAs() public view returns (address[] memory) {
    return fractionalizedNFTCAs;
  } 
}