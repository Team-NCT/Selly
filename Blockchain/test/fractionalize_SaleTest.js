const FractionalizedNFTFactory = artifacts.require("FractionalizedNFTFactory");
const FractionalizedNFT = artifacts.require("FractionalizedNFT");
const SellyERC721 = artifacts.require("SellyERC721");
const Sale = artifacts.require("F_NFTSale");
const ethers = require('ethers');

contract("Fractionalize Test", (account) => {
  it ("Start Test!", async () => {
    const SellyERC721Contract = await SellyERC721.deployed();
    const F_NFTFactoryContract = await FractionalizedNFTFactory.deployed();

    let response = await SellyERC721Contract.createMine("", {from: account[1]});
    response = await SellyERC721Contract.createMine("", {from: account[2]});

    const F_NUM = 10;

    let owner = await SellyERC721Contract.ownerOf(1);
    console.log("1번토큰의 주인", owner);

    await F_NFTFactoryContract.Fractionalize(SellyERC721Contract.address, 1, F_NUM, "Fisrt", "FFF", {from: account[1]});
    await F_NFTFactoryContract.Fractionalize(SellyERC721Contract.address, 2, F_NUM, "Second", "SSS", {from: account[2]});

    const allF_NFTCAs = await F_NFTFactoryContract.allF_NFTCAs();

    const F_NFTContract = await FractionalizedNFT.at(allF_NFTCAs[0]);

    
    response = await SellyERC721Contract.setApprovalForAll(allF_NFTCAs[0], true, {from: account[1]});
    response = await SellyERC721Contract.isApprovedForAll(account[1], allF_NFTCAs[0]);
    response = await F_NFTContract.initialize({from: account[1]});
    let account1_num = await F_NFTContract.balanceOf(account[1]);
    console.log("계정1의 소유권 개수", account1_num);
    assert.equal(account1_num, F_NUM, "WRONG");

    const pieceOfPrice = ethers.utils.parseEther('1');
    response = await F_NFTContract.createSale(10, pieceOfPrice, {from: account[1]});

    total_num = await F_NFTContract.totalSupply();
    console.log("총 소유권 개수", total_num);

    account1_num = await F_NFTContract.balanceOf(account[1]);
    console.log("판매 등록 후 계정1의 소유권 개수", account1_num);

    console.log("소유권을 가지고 있는 주소들", await F_NFTContract.getAllAddresses());

    const allSaleCAs = await F_NFTContract.allSaleCAs();
    const SaleContract = await Sale.at(allSaleCAs[0]);

    let saleContract_num = await F_NFTContract.balanceOf(SaleContract.address);
    console.log("판매 컨트랙트의 소유권 개수", saleContract_num)
    
    console.log("판매 컨트랙트 주소들", await F_NFTContract.allSaleCAs());
    
    const purchaseNum = 3;
    await SaleContract.purchase(purchaseNum, {from: account[5], value: pieceOfPrice*purchaseNum});
    await SaleContract.purchase(purchaseNum, {from: account[5], value: pieceOfPrice*purchaseNum});

    saleContract_num = await F_NFTContract.balanceOf(SaleContract.address);
    console.log("구입 후 판매 컨트랙트의 소유권 개수", saleContract_num, await SaleContract.amount())
    let account5_num = await F_NFTContract.balanceOf(account[5]);
    console.log("계정5의 소유권 개수", account5_num);

    console.log("판매 컨트랙트 주소들", await F_NFTContract.allSaleCAs());

    console.log("소유권을 가지고 있는 주소들", await F_NFTContract.getAllAddresses());

    await F_NFTContract.startAuction( ethers.utils.parseEther('10'), {from: account[5]});

    await F_NFTContract.cancelAuction({from: account[5]});

    await F_NFTContract.startAuction( ethers.utils.parseEther('20'), {from: account[5]});
    console.log("경매기간", await F_NFTContract.auctionEndTime());
    await F_NFTContract.bid({from: account[7], value:  ethers.utils.parseEther('20')});
    console.log("현재 입찰 최고가 및 입찰자", await F_NFTContract.getHighestBid(), await F_NFTContract.getHighestBidder());
    console.log("입찰자 생성 후 경매기간", await F_NFTContract.auctionEndTime());
    await F_NFTContract.bid({from: account[8], value:  ethers.utils.parseEther('30')});
    console.log("현재 입찰 최고가 및 입찰자", await F_NFTContract.getHighestBid(), await F_NFTContract.getHighestBidder());
    console.log("금고가 가진 돈", await F_NFTContract.getBalance());

    // assert.equal(await F_NFTContract.getHighestBid(), await F_NFTContract.getBalance(), "WRONG");

    await F_NFTContract.auctionEnd();
    
    owner = await SellyERC721Contract.ownerOf(1);
    console.log("1번토큰의 주인", owner);

    total_num = await F_NFTContract.totalSupply();
    console.log("총 소유권 개수", total_num);

    account1_num = await F_NFTContract.balanceOf(account[1]);
    console.log("계정1의 소유권 개수", account1_num);
    saleContract_num = await F_NFTContract.balanceOf(SaleContract.address);
    console.log("판매 컨트랙트의 소유권 개수", saleContract_num, await SaleContract.amount());
    account5_num = await F_NFTContract.balanceOf(account[5]);
    console.log("계정5의 소유권 개수", account5_num);

    console.log("판매컨트랙트가 가지고 있는 돈", await SaleContract.getBalance());

    console.log("판매 컨트랙트 주소들", await F_NFTContract.allSaleCAs());

  })
})