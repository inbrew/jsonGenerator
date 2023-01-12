const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const base = path.resolve(__dirname, "../nftData");
const jsonBase = path.resolve(__dirname, "../nftJson");

// config
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const jwt = process.env.JWT_KEY;

// pinata
const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK({
  pinataApiKey: accessKey,
  pinataSecretApiKey: secretAccessKey,
});
const pinataUrl = "https://api.pinata.cloud/pinning/pinFileToIPFS";
const pinataJsonUrl = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

const nftDataFiles = fs.readdirSync(base);
const nftJsonFiles = fs.readdirSync(jsonBase);

// const { pinFileToIPFS } = require("./makeTokenUri");

const pinIMGToIPFS = async (reqData) => {
  let imgUrl = [];

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

    imgUrl.push(`https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`);
  }

  //   return imgUrl;

  console.log("img : ", imgUrl);

  // 여기서부터 복사
  const metaDataJson = `{
    "name": "${reqData.name}",
    "description": "${reqData.description}",
    "image": "${imgUrl[0]}"
  }`;

  fs.writeFile(
    `${jsonBase}/${reqData.name}.json`,
    metaDataJson,
    "utf8",
    (e) => e
  );

  //   let jsonData = new FormData();
  //   jsonData.append(
  //     "file",
  //     fs.createReadStream(`${jsonBase}/${nftJsonFiles[0]}`)
  //   );
  //   let tokenUrl = [];
  console.log(reqData.name)
  try {
    // console.log("여긴 들어와??");
    const body = {
      message: 'Pinatas are awesome'
    };
    const stream = fs.createReadStream(`${jsonBase}/${nftJsonFiles[0]}`);
    const result = await pinata
      .pinJSONToIPFS(body, {
        pinataMetadata: { name: reqData.name },
      })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });

    return result;
  } catch (err) {
    console.log(err);
  }
};

const pinFileToIPFS = async (data, imgUrl) => {
  const metaDataJson = `{
    "name": "${data.name}",
    "description": "${data.description}",
    "image": "${imgUrl[0]}"
  }`;

  fs.writeFile(`${jsonBase}/${data.name}.json`, metaDataJson, "utf8", (e) => e);

  //   let jsonData = new FormData();
  //   jsonData.append(
  //     "file",
  //     fs.createReadStream(`${jsonBase}/${nftJsonFiles[0]}`)
  //   );

  const stream = fs.createReadStream(`${jsonBase}/${nftJsonFiles[0]}`);
  //   let tokenUrl = [];
  const result = await pinata
    .pinJSONToIPFS(stream, {
      pinataMetadata: { name: data.name },
      pinataOptions: {
        cidVersion: 0,
      },
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
  //   if (nftJsonFiles.length > 0) {
  //     for (let i = 0; i < nftJsonFiles.length; i++) {
  // let jsonData = new FormData();
  // jsonData.append(
  //   "file",
  //   fs.createReadStream(`${jsonBase}/${nftJsonFiles[i]}`)
  // );

  //       try {
  //         const jsonRes = await axios
  //           .post(
  //             pinataJsonUrl,
  //             {
  //               pinataMetadata: {
  //                 name: "test",
  //               },

  //               pinataContent: jsonData,
  //             },
  //             {
  //               headers: {
  //                 pinata_api_key: `${accessKey}`,
  //                 pinata_secret_api_key: `${secretAccessKey}`,
  //               },
  //             }
  //           )
  //           .then((res) => {
  //             console.log(res);
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });

  //         tokenUrl.push(
  //           `https://gateway.pinata.cloud/ipfs/${jsonRes.data.IpfsHash}`
  //         );
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //     console.log("tokenUrl : ", tokenUrl);
  //     return tokenUrl;
  //   }

  return result;
};

module.exports = {
  getNFTJson: async (data) => {
    const imgUrl = await pinIMGToIPFS(data);

    if (imgUrl) {
      //   console.log("이미지 유알엘은 들어옴", imgUrl);
      //   const tokenUri = await pinFileToIPFS(data, imgUrl);
      //   console.log(tokenUri);
      //   return tokenUri;
      console.log("과연? : ", imgUrl);
      return imgUrl;
    }
  },
};

// const nftName = "H and I";
// const description = "Video Tape - H and I";
// const hiddenImgUrl = "https://youtu.be/fsGx3_Ot3zw";
// const ImgUrl = "https://in-nft.s3.ap-northeast-2.amazonaws.com/In_kid.png";
// const totalNum = 1;

// // 여러개
// try {
//   for (let i = 1; i <= totalNum; i++) {
//     let json = `{
//         "name": "${nftName} #${i}",
//         "description": "${description}",
//         "image": "${ImgUrl}",
//         "youtube_url": "${hiddenImgUrl}",
//         "attributes": {
//             "type": "object",
//             "description": "a IN NFT json"
//         }
//     }`;

//     fs.writeFile(`${base}/${i}.json`, json, "utf8", (e) => e);
//   }
//   console.log("complete!");
// } catch (error) {
//   console.log(error);
// }
