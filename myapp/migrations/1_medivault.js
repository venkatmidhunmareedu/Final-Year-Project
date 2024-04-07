var Medivault = artifacts.require("./Medivault.sol");

module.exports = function (deployer) {
  deployer.deploy(Medivault);
};