const router = require("express").Router();
const { multerUpload } = require("../data/serveUpload");

router.post("/upload", multerUpload.array("file"), async (req, res) => {

    res
        .status(200)
        .send({ data: req.files.length, message: "You are ready to mint." });
});


module.exports = router;
