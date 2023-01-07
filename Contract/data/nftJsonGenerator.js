const fs = require("fs");
const path = require("path");
const basePath = __dirname;
let base = path.join(basePath, "/nftJson");

const nftName = "I Graduation";
const description = "Video Tape - I Graduation";
const hiddenImgUrl =
  "https://in-nft.s3.ap-northeast-2.amazonaws.com/%E1%84%92%E1%85%B4%E1%84%89%E1%85%AE_%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%89%E1%85%AE(%E1%84%90%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%91%E1%85%B3).mp3";
const totalNum = 1;

try {
  for (let i = 1; i <= totalNum; i++) {
    let json = `{"name":"${nftName} #${i}","description":"${description}","image":"${hiddenImgUrl}","attributes":[{"trait_type": "Unknown","value": "Unknown"}]}`;

    fs.writeFile(`${base}/${i}.json`, json, "utf8", (e) => e);
  }
  console.log("complete!");
} catch (error) {
  console.log(error);
}
