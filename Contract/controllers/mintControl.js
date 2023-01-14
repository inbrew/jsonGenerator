const fs = require("fs");
const path = require("path");
const base = path.resolve(__dirname, "../nftData");
console.log("base : ", base);

const nftDataFiles = fs.readdirSync(`${base}`);
console.log("nftDataFiles : ", nftDataFiles);

const { getNFTJson } = require("../data/nftJsonGenerator.js");
const { minting } = require("../setContract/minting");

module.exports = {
  mint: async (req, res) => {
    // console.log("민팅할 주소 : ", req.body.address);
    console.log("Client data : ", req.body.data);
    console.log("현재 데이터가 있니? 두개 이상이면 민팅안됨. : ", nftDataFiles);
    const tokenURI = await getNFTJson(req.body.data);

    console.log("tokenURI : ", tokenURI);

    if (tokenURI) {
      const result = await minting(tokenURI);

      if (result) {
        res.send({
          data: result,
          message: "민팅이 되었습니다.!",
        });

        for (let i = 0; i < nftDataFiles.length; i++) {
          fs.unlinkSync(`${base}/${nftDataFiles[i]}`);
        }
      } else {
        res.send("민팅이 되지 않았습니다.");

        for (let i = 0; i < nftDataFiles.length; i++) {
          fs.unlinkSync(`${base}/${nftDataFiles[i]}`);
        }
      }
    } else {
      res.send("민팅이 되지 않았습니다. 이건 서버 문제입니다.");

      for (let i = 0; i < nftDataFiles.length; i++) {
        fs.unlinkSync(`${base}/${nftDataFiles[i]}`);
      }
    }
  },
};
