const router = require("express").Router();
const { upLoad } = require("../controllers/fileControll");
const { multerUpload } = require("../data/serveUpload");


router.post("/upload", multerUpload.array("img"), async (req, res, next) => {
    console.log("adfsasdfadsfasfasd", req.body);
    console.log(req.files);

    res.send("아직이야");
});

module.exports = router;