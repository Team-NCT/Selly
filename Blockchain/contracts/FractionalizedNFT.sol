// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract FractionalizedNFT is ERC20, Ownable, ERC20Permit, ERC721Holder {
  IERC721 public collection;
  address public NFTCA;
  uint256 public amount;
  uint256 public tokenId;
  address public creater;
  bool public initialized = false;
  bool public forSale = false;
  uint256 public salePrice;
  bool public canRedeem = false;
  uint256 public firstPrice;

  // event Check(
  //   address indexed _owner,
  //   address indexed _creater
  // );

  constructor(
    address _NFTCA, 
    uint256 _tokenId, 
    uint256 _amount, 
    address _creater, 
    string memory _name, 
    string memory _symbol,
    uint256 _firstPrice
  ) 
    ERC20(_name, _symbol) ERC20Permit(_name) {
      collection = IERC721(_NFTCA);
      // emit Check(collection.ownerOf(_tokenId), _creater);
      
      require(collection.ownerOf(_tokenId) == _creater, "Not owner of token");
      require(_amount > 0, "Amount needs to be more than 0");

      tokenId = _tokenId;
      NFTCA = _NFTCA;
      amount = _amount;
      creater = _creater;
      firstPrice = _firstPrice;
    }
  
  function initialize() external {
    require(msg.sender == creater, "Can only creater");
    require(!initialized, "Already initialized");
    collection.safeTransferFrom(msg.sender, address(this), tokenId);
    initialized = true;
    _mint(msg.sender, amount);
  }

  function putForSale(uint256 price) external {
    salePrice = price;
    forSale = true;
  }

  function purchase() external payable {
    require(forSale, "Not for sale");
    require(msg.value >= salePrice, "Not enough ether sent");
    collection.transferFrom(address(this), msg.sender, tokenId);
    forSale = false;
    canRedeem = true;
  }

  function redeem(uint256 _amount) external {
    require(canRedeem, "Redemption not available");
    uint256 totalEther = address(this).balance;
    uint256 toRedeem = _amount * totalEther / totalSupply();

    _burn(msg.sender, _amount);
    payable(msg.sender).transfer(toRedeem);
  }
}