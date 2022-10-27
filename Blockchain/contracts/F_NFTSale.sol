// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract F_NFTSale{
  IERC20 public F_NFTContract;
  address seller;
  address F_NFTCA;
  uint256 amount;
  uint256 price;

  constructor (
    address _seller,
    address _F_NFTCA,
    uint256 _amount,
    uint256 _price
  ) {
    F_NFTContract = IERC20(_F_NFTCA);
    seller = _seller;
    F_NFTCA = _F_NFTCA;
    amount = _amount;
    price = _price;
  }
}