const FractionalizedNFTFactory = artifacts.require("FractionalizedNFTFactory");
const FractionalizedNFT = artifacts.require("FractionalizedNFT");
const SellyERC721 = artifacts.require("SellyERC721");
const Sale = artifacts.require("F_NFTSale");

contract("Fractionalize Test", (account) => {
  it ("Start Test!", async () => {
    const SellyERC721Contract = await SellyERC721.deployed();
    const F_NFTFactoryContract = await FractionalizedNFTFactory.deployed();

    let response = await SellyERC721Contract.createMine("", {from: account[1]});
    response = await SellyERC721Contract.createMine("", {from: account[2]});

    const F_NUM = 10;

    await F_NFTFactoryContract.Fractionalize(SellyERC721Contract.address, 1, F_NUM, "Fisrt", "FFF", 100, {from: account[1]});
    await F_NFTFactoryContract.Fractionalize(SellyERC721Contract.address, 2, F_NUM, "Second", "SSS", 200, {from: account[2]});

    const allF_NFTCAs = await F_NFTFactoryContract.allF_NFTCAs();

    const F_NFTContract = await FractionalizedNFT.at(allF_NFTCAs[0]);

    
    response = await SellyERC721Contract.setApprovalForAll(allF_NFTCAs[0], true, {from: account[1]});
    response = await SellyERC721Contract.isApprovedForAll(account[1], allF_NFTCAs[0]);
    response = await F_NFTContract.initialize({from: account[1]});
    let account1_num = await F_NFTContract.balanceOf(account[1]);
    console.log("계정1의 소유권 개수", account1_num);
    assert.equal(account1_num, F_NUM, "WRONG");

    response = await F_NFTContract.createSale(5, 100, {from: account[1]});

    account1_num = await F_NFTContract.balanceOf(account[1]);
    console.log("계정1의 소유권 개수", account1_num);
    
    total_num = await F_NFTContract.totalSupply();
    console.log("총 소유권 개수", total_num);

    const allSaleCAs = await F_NFTContract.allSaleCAs();

    let saleContract_num = await F_NFTContract.balanceOf(allSaleCAs[0]);
    console.log("판매 컨트랙트의 소유권 개수", saleContract_num)
  })
})