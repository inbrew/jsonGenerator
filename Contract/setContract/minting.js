// EOA data
const { address, privateKey, polygonTestNetRpcURL } = require("../env-config");

const Web3 = require("web3");
const web3 = new Web3(polygonTestNetRpcURL);

// Contract data
const { InNFTCA, InNFTABI } = require("../data/getAbiData");
const inNFTContract = new web3.eth.Contract(InNFTABI, InNFTCA);

const mining = async () => {
  console.log(inNFTContract);
};
