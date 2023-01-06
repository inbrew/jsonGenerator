require("dotenv").config();

const address = process.env.ADDRESS;
const privateKey = process.env.PRIVATE_KEY;
const polygonTestNetRpcURL = process.env.RPC_URL;

console.log(address, privateKey, polygonTestNetRpcURL);

module.exports = {
  address,
  privateKey,
  polygonTestNetRpcURL,
};
