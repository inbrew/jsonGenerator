const { getNFTJson } = require("../data/nftJsonGenerator.js");

module.exports = {
  mint: async (req, res) => {
    const metaData = await getNFTJson(req.body.data);
    if (metaData) {
      res.send("민팅이 되었습니다.!");
    } else {
      res.send("민팅이 되지 않았습니다. 이건 서버 문제입니다.");
    }

  },
};
