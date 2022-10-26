const FractionalizedNFTFactory = artifacts.require("FractionalizedNFTFactory");

module.exports = function (deployer) {
  deployer.deploy(FractionalizedNFTFactory);
};