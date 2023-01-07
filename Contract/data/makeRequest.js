const { makeAbi } = require("../data/makeAbiJson");

const json = require("../build/contracts/InNFT.json");
console.log(json);

const makeInNFT = async (address) => {
  makeAbi("InNFT.json", "");
};

// module.exports = {

// }
