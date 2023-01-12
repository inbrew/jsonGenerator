const router = require("express").Router();
const { mint } = require("../controllers/mintControl");

router.post("/mint", mint);

module.exports = router;
