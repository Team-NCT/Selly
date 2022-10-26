const FractionalizedNFTFactory = artifacts.require("FractionalizedNFTFactory");
const FractionalizedNFT = artifacts.require("FractionalizedNFT");
const SellyERC721 = artifacts.require("SellyERC721");

contract("Fractionalize Test", (account) => {
  it ("Start Test!", async () => {
    const SellyERC721Contract = await SellyERC721.deployed();
    const F_NFTFactoryContract = await FractionalizedNFTFactory.deployed();

    let response = await SellyERC721Contract.createMine("", {from: account[1]});
    response = await SellyERC721Contract.createMine("", {from: account[2]});

    const F_NUM = 10;

    const F1 = await F_NFTFactoryContract.Fractionalize(SellyERC721Contract.address, 1, F_NUM, {from: account[1]});
    const F2 = await F_NFTFactoryContract.Fractionalize(SellyERC721Contract.address, 2, F_NUM, {from: account[2]});

    const allF_NFTCAs = await F_NFTFactoryContract.allF_NFTCAs();

    const F_NFTContract = await FractionalizedNFT.at(allF_NFTCAs[0]);

    
    response = await SellyERC721Contract.setApprovalForAll(allF_NFTCAs[0], true, {from: account[1]});
    response = await SellyERC721Contract.isApprovedForAll(account[1], allF_NFTCAs[0]);
    response = await F_NFTContract.initialize({from: account[1]});
    const response2 = await F_NFTContract.balanceOf(account[1]);

    console.log(response2);
    
    assert.equal(response2, F_NUM, "WRONG");
  })
})