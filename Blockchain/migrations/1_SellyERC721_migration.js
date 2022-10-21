const SellyERC721 = artifacts.require("SellyERC721");

module.exports = function (deployer) {
  deployer.deploy(SellyERC721);
};