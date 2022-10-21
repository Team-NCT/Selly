const SellyNFT = artifacts.require("SellyERC721")

contract("SellyERC721", () => {
  it ("Start Test!", async () => {
    const instance = await SellyNFT.deployed();
    const response = await instance.current();
    console.log("zzzz", response);
    assert.equal(response, 1, "WRONG");
  })
})