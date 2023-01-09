// import AWS from "aws-sdk";
// import path from "path";
// require('dotenv').config({ path: path.resolve(__dirname, "../../.env") });
require('dotenv').config();
// AWS.config.update({ region: 'ap-northeast-2' });
// const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

// s3.listBuckets((err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("성공함", data.Buckets);
//     }
// })
const config = process.env.REACT_APP_ACCESS_KEY_ID;
console.log(config);