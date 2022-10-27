// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "./F_NFTSale.sol";

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

  // 판매 컨트랙트의 주소를 저장하는 배열
  address[] public F_NFTSaleCAs;

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

      NFTCA = _NFTCA;
      tokenId = _tokenId;
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
    require(msg.sender == creater, "Can only creater");
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

  function createSale(uint256 _amount, uint256 _price) public returns (address) {
    address F_NFTSaleCA = address(
        new F_NFTSale(msg.sender, address(this), _amount, _price)
    );

    F_NFTSaleCAs.push(F_NFTSaleCA);

    transfer(F_NFTSaleCA, _amount);
    return F_NFTSaleCA;
  }

  function allSaleCAs() public view returns (address[] memory) {
    return F_NFTSaleCAs;
  }

  // 팔고 있는 조각이 다 팔린 판매컨트랙트 주소 제거
  function removeSoldoutSaleCA(address _SaleCA) external {
    require(msg.sender == _SaleCA, "Only remove myself");

    for (uint256 i = 0; i < F_NFTSaleCAs.length; i++) {
      if (F_NFTSaleCAs[i] == _SaleCA) {
        F_NFTSaleCAs[i] = F_NFTSaleCAs[F_NFTSaleCAs.length - 1];
        F_NFTSaleCAs.pop();
      }
    }
  }
}