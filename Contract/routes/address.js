const router = require("express").Router();
const { checkAddress, checkNetwork } = require("../controllers/addressControl");

router.post("/check", checkAddress);
router.get("/network", checkNetwork);

module.exports = router;
