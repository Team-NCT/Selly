// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract FractionsFactory is ERC1155 {
    uint256 private _fractionIds;
    mapping(uint256 => uint256) fractionIdOfToken;

    constructor() ERC1155("Temporary_URI/{id}") {}

    function current() public view returns (uint256) {
        return _fractionIds;
    }

    function fractionalize(uint256 fractionNum, uint256 tokenId)
        public
        returns (uint256)
    {
        uint256 fractionId = current() + 1;
        fractionIdOfToken[tokenId] = fractionId;
        _fractionIds = fractionId;
        _mint(msg.sender, fractionId, fractionNum, "");
        return fractionId;
    }
}