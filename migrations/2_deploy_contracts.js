var safemath = artifacts.require("./safemath.sol");
var favorcoin = artifacts.require("./favorcoin.sol");

module.exports = function(deployer) {
    deployer.deploy(safemath);
    deployer.link(safemath, favorcoin);
    deployer.deploy(favorcoin);
};
