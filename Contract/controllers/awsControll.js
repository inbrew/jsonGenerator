const AWS = require("aws-sdk");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, "../.env") });

AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
});

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const params = {
    Bucket: "in-nft",
    Key: "1.json"
}

s3.putObject(params, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log("성공함", data);
    }
})



module.exports = {
    getS3BucketsList: async (req, res) => {

        res.send("ok!");


    }
}