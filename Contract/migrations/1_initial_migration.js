// contract
const inNFT = artifacts.require("InNFT");

// makeAbi
const { makeInNFT } = require("../data/makeRequest");

module.exports = async function (deployer) {
  await deployer.deploy(inNFT);
  const inNFTContract = await inNFT.deployed();

  makeInNFT(inNFTContract.address);
};
