// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./FractionalizedNFT.sol";

contract FractionalizedNFTFactory {
  // 분할된 NFT들의 컨트랙트 주소를 저장하는 배열
  address[] public fractionalizedNFTCAs;
  // 해당 NFT의 CA에 토큰 id를 넣으면 금고 컨트랙트(FractionalizedNFT)의 주소가 나오도록 매필
  mapping(address => mapping(uint256 => address)) public F_NFTCA;
  
  // 이벤트
  event FractionalizeNFT(
    address F_CA,
    address indexed NFTCA,
    uint256 indexed tokenId,
    address owner,
    uint256 amount
  );

  constructor() {}

  function Fractionalize 
  (
    address _NFTCA, 
    uint256 _tokenId, 
    uint256 _amount, 
    string memory _name, 
    string memory _symbol
  ) 
    external 
    returns (address)
  {
    address fractionalizedNFTCA = address(
        new FractionalizedNFT(_NFTCA, _tokenId, _amount, msg.sender, _name, _symbol)
    );
    fractionalizedNFTCAs.push(fractionalizedNFTCA);
    F_NFTCA[_NFTCA][_tokenId] = fractionalizedNFTCA;

    emit FractionalizeNFT(fractionalizedNFTCA, _NFTCA, _tokenId, msg.sender, _amount);

    return fractionalizedNFTCA;
  }

  function allF_NFTCAs() public view returns (address[] memory) {
    return fractionalizedNFTCAs;
  }

  function CAOfNFTCAbyTokenId
  (
    address _NFTCA, 
    uint256 _tokenId
  ) 
    public 
    view 
    returns (address) 
  {
    return F_NFTCA[_NFTCA][_tokenId];
  }
}