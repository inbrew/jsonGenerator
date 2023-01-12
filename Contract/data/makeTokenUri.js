const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, "../.env") });
const jsonBase = path.resolve(__dirname, "../nftJson");

// config
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const pinataUrl = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

const axios = require("axios");
const fs = require("fs");
const FormData = require('form-data');

const nftJsonFiles = fs.readdirSync(jsonBase);


const pinFileToIPFS = async (data, imgUrl) => {
    const metaDataJson = `{
    "name": "${data.name}",
    "description": "${data.description}",
    "image": "${imgUrl[0]}"
  }`;

    fs.writeFile(`${jsonBase}/${data.name}.json`, metaDataJson, "utf8", (e) => e);

    // Json 파일이 생성 되었다면 피나타에 올림
    if (nftJsonFiles.length > 0) {
        let jsonData = new FormData();
        jsonData.append("file", fs.createReadStream(`${jsonBase}/${nftJsonFiles[0]}`));

        // try {
        const res = await axios.post(pinataUrl, jsonData, {
            maxContentLength: "Infinity",
            headers: {
                "Content-Type": `multipart/form-data; boundary=${jsonData._boundary}`,
                pinata_api_key: accessKey,
                pinata_secret_api_key: secretAccessKey,
            },
        }).then(res => {
            console.log(res);
        })



        const result = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;


        return result;
        // } catch (err) {
        //   console.log(err);
        // }


    } else {
        console.log("안되었습니다.");
    }
}


module.exports = {
    pinFileToIPFS
}



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
