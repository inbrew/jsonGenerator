const router = require("express").Router();
const { upLoad } = require("../controllers/fileControll");
const { multerUpload } = require("../data/serveUpload");

router.post("/upload", multerUpload.array("file"), async (req, res) => {
  console.log(req.files.length);

  res
    .status(200)
    .send({ data: req.files.length, message: "You are ready to mint." });
});

module.exports = router;
