const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });



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

const FormData = require("form-data");

const pinIMGToIPFS = async (reqData) => {
  const fs = require("fs");
  const base = path.resolve(__dirname, "../nftData");
  const nftDataFiles = fs.readdirSync(`${base}`);
  console.log("nftJsonGenerator 쪽 : ", nftDataFiles);
  console.log("넌 이름이 뭐야 : ", reqData.name);
  console.log("잘들어왔니 : ", nftDataFiles.length);

  if (nftDataFiles.length !== 0) {
    let imgUrl = "";

    // file 여러개 올릴때는 주석 해제
    // for (let i = 0; i < nftDataFiles.length; i++) {
    let data = new FormData();
    data.append("file", fs.createReadStream(`${base}/${nftDataFiles[0]}`));

    const res = await axios
      .post(pinataUrl, data, {
        maxContentLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          pinata_api_key: `${accessKey}`,
          pinata_secret_api_key: `${secretAccessKey}`,
        },
      })
      .catch(() => {
        for (let i = 0; i < nftDataFiles.length; i++) {
          fs.unlinkSync(`${base}/${nftDataFiles[i]}`);
        }
      });
    // }

    imgUrl = `ipfs://${res.data.IpfsHash}`;

    console.log("img : ", imgUrl);

    // 여기서부터 복사
    const metaDataJson = {
      name: `${reqData.name}`,
      description: `${reqData.description}`,
      image: `${imgUrl}`,
    };

    const metaDataUri = await pinata
      .pinJSONToIPFS(metaDataJson, {
        pinataMetadata: {
          name: reqData.name,
        },
      })
      .then((res) => {
        return res.IpfsHash;
      })
      .catch((err) => {
        console.log(err);
        for (let i = 0; i < nftDataFiles.length; i++) {
          fs.unlinkSync(`${base}/${nftDataFiles[i]}`);
        }
      });

    const result = `ipfs://${metaDataUri}`;

    return result;
  }
};

module.exports = {
  getNFTJson: async (data) => {
    const tokenUri = await pinIMGToIPFS(data);

    // 이제 이것을 민팅 시키면 됨.
    return tokenUri;
  },
};
