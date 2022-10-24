// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract FractionsFactory is ERC1155 {
    uint256 private _fractionIds;
    mapping(uint256 => uint256) fractionIdOfToken;
    mapping(uint256 => uint256) TokenOfFraction;

    constructor() ERC1155("https://skywalker.infura-ipfs.io/ipfs/QmVJSbTsSF1rsm4ED4NSTYZXTReQxf1CFZ81Cwr4a2mEpU") {}

    function current() public view returns (uint256) {
        return _fractionIds;
    }

    function fractionalize(uint256 fractionNum, uint256 tokenId)
        public
        returns (uint256)
    {
        uint256 fractionId = current() + 1;
        fractionIdOfToken[tokenId] = fractionId;
        TokenOfFraction[fractionId] = tokenId;
        _fractionIds = fractionId;
        _mint(msg.sender, fractionId, fractionNum, "");
        return fractionId;
    }
}