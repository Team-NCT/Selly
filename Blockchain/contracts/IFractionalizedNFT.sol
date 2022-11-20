// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IFractionalizedNFT {
  function F_NFTSaleCAs() external returns (address[] memory);

  function removeSoldoutSaleCA(address) external;
}