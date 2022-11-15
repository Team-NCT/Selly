const FractionalizedNFTFactory = artifacts.require("FractionalizedNFTFactory");
const FractionalizedNFT = artifacts.require("FractionalizedNFT");
const SellyERC721 = artifacts.require("SellyERC721");
const Sale = artifacts.require("F_NFTSale");
const ethers = require("ethers");

contract("Event Test", (account) => {
  it("Start!!", async () => {
    const SellyERC721Contract = await SellyERC721.deployed();
    const F_NFTFactoryContract = await FractionalizedNFTFactory.deployed();

    await SellyERC721Contract.createMine("", { from: account[1] });
    await SellyERC721Contract.createMine("", { from: account[2] });

    const F_NUM = 10;

    await F_NFTFactoryContract.Fractionalize(
      SellyERC721Contract.address,
      1,
      F_NUM,
      "Fisrt",
      "FFF",
      { from: account[1] }
    );
    await F_NFTFactoryContract.Fractionalize(
      SellyERC721Contract.address,
      2,
      F_NUM,
      "Second",
      "SSS",
      { from: account[2] }
    );

    const allF_NFTCAs = await F_NFTFactoryContract.allF_NFTCAs();

    const F_NFTContract = await FractionalizedNFT.at(allF_NFTCAs[0]);

    response = await SellyERC721Contract.setApprovalForAll(
      allF_NFTCAs[0],
      true,
      { from: account[1] }
    );

    await F_NFTContract.initialize({ from: account[1] });

    const pieceOfPrice = ethers.utils.parseEther("1");
    response = await F_NFTContract.createSale(8, pieceOfPrice, {
      from: account[1],
    });

    const allSaleCAs = await F_NFTContract.allSaleCAs();
    const SaleContract = await Sale.at(allSaleCAs[0]);

    const purchaseNum = 6;

    await SaleContract.purchase(purchaseNum, {
      from: account[5],
      value: pieceOfPrice * purchaseNum,
    });

    // await SaleContract.cancelSale({ from: account[1] });

    await F_NFTContract.startAuction(ethers.utils.parseEther("10"), {
      from: account[5],
    });

    await F_NFTContract.cancelAuction({ from: account[5] });

    await F_NFTContract.startAuction(ethers.utils.parseEther("20"), {
      from: account[5],
    });

    await F_NFTContract.bid({
      from: account[7],
      value: ethers.utils.parseEther("20"),
    });

    // await F_NFTContract.bid({
    //   from: account[7],
    //   value: ethers.utils.parseEther("20"),
    // });

    await F_NFTContract.bid({
      from: account[8],
      value: ethers.utils.parseEther("50"),
    });

    await F_NFTContract.auctionEnd();

    assert.equal(1, 2, "WRONG");
  });
});
