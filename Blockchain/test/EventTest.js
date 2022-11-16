const EventTest = artifacts.require("EventTest")

contract("EventTest", (account) => {
  it ("Event Test!!", async () => {
    const instance = await EventTest.deployed();
    let response = await instance.currentTokenId();
    console.log("현재", response.receipt.logs);

    response = await instance.addTokenId();
    console.log("현재", response.receipt.logs);

    response = await instance.testCall();
    console.log("현재", response.receipt.logs);
  })
})