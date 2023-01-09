const path = require("path");
require('dotenv').config({path: path.resolve(__dirname, "../.env")});

// EOA data
const address = process.env.ADDRESS;
const privateKey = process.env.PRIVATE_KEY;
const polygonTestNetRpcURL =process.env.RPC_URL;

const Web3 = require("web3");
const web3 = new Web3(polygonTestNetRpcURL);

// Contract data
const { InNFTCA, InNFTABI } = require("../data/getAbiData");
const InNftContract = new web3.eth.Contract(InNFTABI, InNFTCA).methods;

// nftJson
const nftJson = "https://in-nft.s3.ap-northeast-2.amazonaws.com/1.json";

const minting = async () => {
  const mint = InNftContract.mintNFT(address, nftJson).encodeABI();

  const SendTransactionNoValue = async (data, to) => {
    await web3.eth.accounts
      .signTransaction(
        {
          from: address,
          to: to,
          gas: 5000000,
          data: data,
        },
        privateKey
      )
      .then(async (Tx) => {
        await web3.eth
          .sendSignedTransaction(Tx.rawTransaction)
          .then((hash, err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("seccess No Value");
            }
          });
      });
  };

  await SendTransactionNoValue(mint, InNFTCA);
};

minting();
