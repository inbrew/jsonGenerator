const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const base = path.resolve(__dirname, "../nftData");

// config
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

// pinata
const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK({
  pinataApiKey: accessKey,
  pinataSecretApiKey: secretAccessKey,
});
const pinataUrl = "https://api.pinata.cloud/pinning/pinFileToIPFS";

const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

const nftDataFiles = fs.readdirSync(base);


const pinIMGToIPFS = async (reqData) => {
  let imgUrl = '';

  for (let i = 0; i < nftDataFiles.length; i++) {
    let data = new FormData();
    data.append("file", fs.createReadStream(`${base}/${nftDataFiles[i]}`));

    const res = await axios.post(pinataUrl, data, {
      maxContentLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: `${accessKey}`,
        pinata_secret_api_key: `${secretAccessKey}`,
      },
    });

    imgUrl = `ipfs://${res.data.IpfsHash}`;
  }

  //   return imgUrl;

  console.log("img : ", imgUrl);

  // 여기서부터 복사
  const metaDataJson = {
    "name": `${reqData.name}`,
    "description": `${reqData.description}`,
    "image": `${imgUrl}`
  };


  const metaDataUri = await pinata
    .pinJSONToIPFS(metaDataJson, {
      pinataMetadata: {
        name: reqData.name
      }
    })
    .then((res) => {
      return res.IpfsHash;
    })
    .catch((err) => {
      console.log(err);
    });

  const result = `ipfs://${metaDataUri}`

  return result;
};

module.exports = {
  getNFTJson: async (data) => {
    const tokenUri = await pinIMGToIPFS(data);

    // 이제 이것을 민팅 시키면 됨.
    return tokenUri;
  },
};
