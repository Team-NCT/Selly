// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "./F_NFTSale.sol";
import "./IF_Sale.sol";

contract FractionalizedNFT is ERC20, Ownable, ERC20Permit, ERC721Holder {
  // 분할 관련 변수
  IERC721 public collection;
  address public NFTCA;
  uint256 public amount;
  uint256 public tokenId;
  address public creater;
  bool public initialized = false;
  IF_Sale public SaleContract;

  // 판매 컨트랙트의 주소를 저장하는 배열
  address[] public F_NFTSaleCAs;
  mapping(address => address) public sellerAddress;

  // 소유권을 가진 유저들의 주소를 저장하는 배열
  address[] public partyAddresses;
  uint256 partyAddressesLength;
  mapping(address => uint256) partyAddressesIdx;

  // 경매 관련 변수
  uint256 public auctionEndTime;
  uint256 public minimumPrice;

  address public highestBidder;
  uint256 public highestBid;

  bool public auctionStatus = false;
  bool public ended = false;

  // 이벤트
  event CreateSale (
    address F_CA,
    address F_SaleCA,
    address seller,
    uint256 amount,
    uint256 price
  );
  event StartAuc (
    address F_CA,
    uint256 minimumPrice,
    bool auctionStatus
  );
  event CancelAuc (address F_CA, bool auctionStatus);
  event HighestBidIncreased (
    address F_CA, 
    address preBidder, 
    uint256 preAmount, 
    address bidder, 
    uint256 amount
  );
  event EndAuc (address F_CA, bool ended);
  event Burn (address user, uint256 amount);
  event Check (uint256 amount, address[] users, uint256 index);
  
  constructor(
    address _NFTCA, 
    uint256 _tokenId, 
    uint256 _amount, 
    address _creater, 
    string memory _name, 
    string memory _symbol
  ) 
    ERC20(_name, _symbol) ERC20Permit(_name) {
      collection = IERC721(_NFTCA);
      
      require(collection.ownerOf(_tokenId) == _creater, "Not owner of token");
      require(_amount > 0, "Amount needs to be more than 0");

      NFTCA = _NFTCA;
      tokenId = _tokenId;
      amount = _amount;
      creater = _creater;
    }
  
  // 초기화 함수, 단 한 번, 분할 컨트랙트를 생성한 유저만이 실행 가능
  // 수행 전에 해당 NFT 컨트랙트의 setAprrovalAll 실행 필요
  // NFT를 현재 컨트랙트(금고) 로 옮긴 후, 요청한 개수만큼 소유권을 발행
  function initialize() external {
    require(msg.sender == creater, "Can only creater");
    require(!initialized, "Already initialized");
    collection.safeTransferFrom(msg.sender, address(this), tokenId);
    initialized = true;
    _mint(msg.sender, amount);
  }

  function createSale(uint256 _amount, uint256 _price) public returns (address) {
    address F_NFTSaleCA = address(
        new F_NFTSale(msg.sender, address(this), _amount, _price)
    );

    F_NFTSaleCAs.push(F_NFTSaleCA);

    transfer(F_NFTSaleCA, _amount);

    sellerAddress[F_NFTSaleCA] = msg.sender;

    emit CreateSale(address(this), F_NFTSaleCA, msg.sender, _amount, _price);

    return F_NFTSaleCA;
  }

  // 판매컨트랙트 주소 제거 함수
  function removeSoldoutSaleCA(address _SaleCA) external {
    require(msg.sender == _SaleCA, "Only remove myself");

    for (uint256 i = 0; i < F_NFTSaleCAs.length; i++) {
      if (F_NFTSaleCAs[i] == _SaleCA) {
        F_NFTSaleCAs[i] = F_NFTSaleCAs[F_NFTSaleCAs.length - 1];
        F_NFTSaleCAs.pop();
      }
    }
  }

  function startAuction(uint256 _startPrice) external {
    require((100 * balanceOf(msg.sender) / totalSupply()) > 50, "Only user who own more than 50% of fractions can start auction");
    require(!ended, "Auction Ended");
    require(!auctionStatus, "Auctioning");
    require(highestBid == 0, "there is someone who makes a bid");

    auctionStatus = true;
    minimumPrice = _startPrice;

    emit StartAuc(address(this), _startPrice, auctionStatus);
  }

  function cancelAuction() external {
    require((100 * balanceOf(msg.sender) / totalSupply()) > 50, "Only user who own more than 50% of fractions can cancel auction");
    require(!ended, "Auction Ended");
    require(highestBid == 0, "there is someone who makes a bid");
    require(auctionStatus, "Not to auction");

    auctionStatus = false;

    emit CancelAuc(address(this), auctionStatus);
  }

  function bid () external payable {
    require(auctionStatus, "Not to auction");
    // 첫 입찰자가 생긴 경우 설정된 경매 기간 내에만, 입찰 가능하다
    require(highestBid == 0 || block.timestamp <= auctionEndTime, "Not to auction");
    require(msg.value >= minimumPrice, "Have to Bid higher than minimumPrice");
    require(msg.value > highestBid, "Have to Bid higher than current bid");

    // 이전 최고 입찰자에게 돈을 돌려준다.
    if (highestBid  != 0) {
      payable(highestBidder).transfer(highestBid);
    } 
    // 첫 입찰자가 생길 경우 경매 기간을 3일로 설정한다.
    else {
      uint256 threeday = 3 days;
      auctionEndTime = block.timestamp + threeday;
    }

    emit HighestBidIncreased(address(this), highestBidder, highestBid, msg.sender, msg.value);

    highestBidder = msg.sender;
    highestBid = msg.value;
  }

  function auctionEnd() public {
    require(!ended, "Already called");
    require(block.timestamp >= auctionEndTime, "To auction");
    require(highestBid != 0, "Nobody makes a bid");

    ended = true;
    collection.safeTransferFrom(address(this), highestBidder, tokenId);

    uint256 totalFractions = totalSupply();
    // address[] users = ;

    uint256 totalEther = address(this).balance;
    uint256 possessions;
    address user;
    uint256 toRedeem;

    // 소유권을 가진 유저들에게 낙찰 금액 배분
    while(partyAddresses.length != 0) {
      possessions = balanceOf(partyAddresses[0]);
      user = partyAddresses[0];
      
      // emit Check( possessions, partyAddresses, partyAddresses.length);
      _burn(user, possessions);

      toRedeem = possessions * totalEther / totalFractions;
      // 소유권이 판매 컨트랙트에 있을 때, 판매자 주소로 금액 전송 
      if (sellerAddress[user] != address(0)) {
        SaleContract = IF_Sale(user);
        SaleContract.destruct();
        user = sellerAddress[user];
      }
      payable(user).transfer(toRedeem);
    }

    emit EndAuc(address(this), ended);
    selfdestruct(payable(creater));
  }

  function _afterTokenTransfer(
    address from,
    address to,
    uint256 amount
  ) internal virtual override {
    super._afterTokenTransfer(from, to, amount);

    if (to != address(0)) {
      if (partyAddressesIdx[to] == 0) {
        partyAddresses.push(to);
        partyAddressesLength += 1;
        // 배열 첫번째 Item이 partyAddressesIdx[to] == 0에 안걸리기 위해 Idx를 +1해서 저장하기
        partyAddressesIdx[to] = partyAddressesLength; 
      }
    }
    if (from != address(0) && balanceOf(from) == 0) {
      // 지워지는 주소의 mapping 삭제
      uint256 index = partyAddressesIdx[from];
      delete partyAddressesIdx[from];
      // 배열 맨 마지막 Item을 삭제되는 위치에 넣어주기
      address lastUser = partyAddresses[partyAddressesLength - 1];
      // Idx를 +1해서 저장했으니까 사용할 때 -1
      partyAddresses[index - 1] = lastUser;
      partyAddressesLength -= 1;
      partyAddresses.pop();
      partyAddressesIdx[lastUser] = index;
    }
  }

  function allSaleCAs() public view returns (address[] memory) {
    return F_NFTSaleCAs;
  }

  function getAllAddresses() public view returns (address[] memory) {
    return partyAddresses;
  }

  function getHighestBid() public view returns (uint256) {
    return highestBid;
  }

  function getHighestBidder() public view returns (address) {
    return highestBidder;
  }

  function getBalance() public view returns (uint256) {
    return address(this).balance;
  }
}