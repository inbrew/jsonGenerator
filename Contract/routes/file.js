const router = require("express").Router();
const { multerUpload } = require("../data/serveUpload");

router.post("/upload", multerUpload.single("file"), async (req, res) => {
    console.log(req.file);
    res
        .status(200)
        .send({ message: "You are ready to mint." });
});


module.exports = router;
