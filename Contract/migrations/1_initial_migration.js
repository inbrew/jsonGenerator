// contract
const inNFT = artifacts.require("InNFT");

// config
const { address } = require("../env-config");
const jsonUrl =
  "https://gateway.pinata.cloud/ipfs/QmRGeNseaeeEoRBGWwRotapBPyKfZ9CrrHTvTEToNM8vn5";

module.exports = async function (deployer) {
  await deployer.deploy(inNFT);
  const inNFTContract = await inNFT.deployed();
  await inNFTContract.mintNFT(address, jsonUrl);
};
