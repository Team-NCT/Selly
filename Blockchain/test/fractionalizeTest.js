const Fractionalize = artifacts.require("FractionsFactory")

contract("FractionsFactory", (account) => {
  it ("Fractionalize Test!", async () => {
    const instance = await Fractionalize.deployed();
    const response1 = await instance.current();
    console.log("before mint", response1);
    const response2 = await instance.createMine("temporary_URI");
    await instance.create(account[0], "temporary_URI2");
    console.log('mint_myself', response2);
    const current_num = await instance.current();
    const response3 = await instance.tokenIDsofWallet(account[0]);
    console.log('tokenIds', response3);
    const response4 = await instance.tokenURIsofWallet(account[0]);
    console.log('tokenUris', response4);
    assert.equal(current_num, 2, "WRONG");
  })
})