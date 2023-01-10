import AWS from "aws-sdk";
// import { S3Client } from "@aws-sdk/client-s3";
// const client = new S3Client({ region: 'ap-northeast-2' })
import * as fs from 'fs';

const data = require('../img/IMG_0307.JPG');

// config
const { accessKeyId, secretAccessKey } = require("../config");

AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
});

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

// get api
export async function getApiCall() {

    const params = {
        Bucket: 'in-nft',
        Key: 'testFile',
        Body: data,
        ACL: 'public-read'
    };
    await s3.putObject(params, (data, err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    });
}