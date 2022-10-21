const FractionsFactory = artifacts.require("FractionsFactory");

module.exports = function (deployer) {
  deployer.deploy(FractionsFactory);
};