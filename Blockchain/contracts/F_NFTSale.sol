// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IFractionalizedNFT.sol";

contract F_NFTSale{
  IERC20 public F_NFTContractERC20;
  IFractionalizedNFT public F_NFTContract;
  address public seller;
  address public F_NFTCA;
  uint256 public amount;
  uint256 public price;

  event Check (
    uint256 price
  );
  event Received(address, uint);

  constructor (
    address _seller,
    address _F_NFTCA,
    uint256 _amount,
    uint256 _price
  ) {
    F_NFTContractERC20 = IERC20(_F_NFTCA);
    F_NFTContract = IFractionalizedNFT(_F_NFTCA);
    seller = _seller;
    F_NFTCA = _F_NFTCA;
    amount = _amount;
    price = _price;
  }

  function purchase (uint256 _amount) external payable{
    require(_amount <= amount, "Can't buy more pieces than the number selling");
    // value의 단위는 wei
    require(msg.value == (price * _amount), "Pay correct price");
    amount -= _amount;
    F_NFTContractERC20.transfer(msg.sender, _amount);
    payable(seller).transfer(address(this).balance);

    // 팔고 있는 조각이 다 팔린 판매컨트랙트 주소 제거 후 컨트랙트 폭파
    if (amount == 0) {
      F_NFTContract.removeSoldoutSaleCA(address(this));
      // selfdestruct(payable(seller)); // Todo: 테스트 끝나면 활성화시키기
    }
  }

  function destruct() external {
    require(F_NFTContractERC20.balanceOf(address(this)) == 0, "Only can destruct when has no piece");
    F_NFTContract.removeSoldoutSaleCA(address(this));
    // selfdestruct(payable(seller)); // Todo: 테스트 끝나면 활성화시키기
  }

  function getBalance() public view returns (uint256) {
    return address(this).balance;
  }

  // 컨트랙트가 ether를 받기 위해 필요한 함수
  receive() external payable {
    emit Received(msg.sender, msg.value);
  }
}