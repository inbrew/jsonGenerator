const { getNFTJson } = require("../data/nftJsonGenerator.js");
const { minting } = require("../setContract/minting");

module.exports = {
  mint: async (req, res) => {
    // console.log("민팅할 주소 : ", req.body.address);
    const tokenURI = await getNFTJson(req.body.data);

    console.log("tokenURI : ", tokenURI);
    if (tokenURI) {
      const result = await minting(tokenURI);

      if (result) {
        res.send({
          data: result,
          message: "민팅이 되었습니다.!"
        });
      } else {
        res.send("민팅이 되지 않았습니다.");
      }

    } else {
      res.send("민팅이 되지 않았습니다. 이건 서버 문제입니다.");
    }

  },
};
