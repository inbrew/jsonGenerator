// EOA data
const polygonTestNetRpcURL =
  "https://polygon-mumbai.infura.io/v3/fa408e18052a47b18c82a59f8b54c1c6";

const Web3 = require("web3");
const web3 = new Web3(polygonTestNetRpcURL);

const address = "0xf9E245E02aCafc6d282537d8245e7894aaB53848";
const privateKey =
  "efaeb760e0548561ce16275a28a7aab86a47608ac766d55390e5593c5f142e36";

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
