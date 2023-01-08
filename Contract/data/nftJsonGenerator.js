const fs = require("fs");
const path = require("path");
const basePath = __dirname;
let base = path.join(basePath, "/nftJson");

const nftName = "H and I";
const description = "Video Tape - H and I";
const hiddenImgUrl = "https://youtu.be/fsGx3_Ot3zw";
const ImgUrl = "https://in-nft.s3.ap-northeast-2.amazonaws.com/In_kid.png";
const totalNum = 1;

// 여러개
try {
  for (let i = 1; i <= totalNum; i++) {
    let json = `{
        "name": "${nftName} #${i}",
        "description": "${description}",
        "image": "${ImgUrl}",
        "youtube_url": "${hiddenImgUrl}",
        "attributes": {
            "type": "object",
            "description": "a IN NFT json"
        }
    }`;

    fs.writeFile(`${base}/${i}.json`, json, "utf8", (e) => e);
  }
  console.log("complete!");
} catch (error) {
  console.log(error);
}
