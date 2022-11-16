// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract EventTest {
  uint256 tokenId;

  event TestCall(address user);
  event AddTokenId(address user, uint256 tokenId);
  event CurrentTokenId(address user, uint256 tokenId);
  constructor() {}

  function addTokenId() public returns(uint256) {
    tokenId += 1;

    emit AddTokenId(msg.sender, tokenId);
    return tokenId;
  }

  function currentTokenId() public returns(uint256) {
    emit CurrentTokenId(msg.sender, tokenId);
    return tokenId;
  }

  function testCall() public {
    emit TestCall(msg.sender);
  }
}