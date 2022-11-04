const EventTest = artifacts.require("EventTest");

module.exports = function (deployer) {
  deployer.deploy(EventTest);
};