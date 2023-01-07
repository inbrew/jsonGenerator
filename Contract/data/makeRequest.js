const { makeAbi } = require("../data/makeAbiJson");

// const json = require("../build/contracts/InNFT.json");

const makeInNFT = async (address) => {
  makeAbi("build/contracts/InNFT.json", "data/abi/InNFT.json", address);
};

module.exports = {
  makeInNFT,
};
