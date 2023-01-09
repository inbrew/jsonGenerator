const router = require("express").Router();
const { getS3BucketsList } = require("../controllers/awsControll");

router.get("/bucket", getS3BucketsList);

module.exports = router;