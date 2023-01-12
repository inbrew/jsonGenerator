const router = require("express").Router();
const { mint } = require("../controllers/jsonControl");

router.get("/mint", mint);

module.exports = router;
