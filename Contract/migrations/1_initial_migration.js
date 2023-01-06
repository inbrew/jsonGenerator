// contract
const inNFT = artifacts.require("InNFT");

// config
const { address } = require("../env-config");

// const { makeInProxy, makeInNFT } = require("../data/makeJson");

// const { sha3 } = require("../setting");

module.exports = async function (deployer) {
  await deployer.deploy(inNFT);
  const inNFTContract = await inNFT.deployed();
  await inNFTContract.mintNFT(address, imgUrl);

  makeInNFT(inNFTContract.address);
  //   makeInProxy(inProxyContract.address);
};
