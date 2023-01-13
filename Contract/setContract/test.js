const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const jsonBase = path.resolve(__dirname, "../nftJson");

// config
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const jwt = process.env.JWT_KEY;

const axios = require('axios');
const fs = require('fs');

// pinata
const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK({
    pinataApiKey: accessKey,
    pinataSecretApiKey: secretAccessKey,
});

const FormData = require("form-data");


const nftJsonFiles = fs.readdirSync(jsonBase);

const pinataUrl = "https://api.pinata.cloud/pinning/pinFileToIPFS";


const pinFileToIPFS = async () => {

    const metaDataJson = {
        "name": "test2",
        "description": "테스트 설명",
        "image": "ipfs://QmbMqvAhPi9zCB5emozg3NtKCucpDs7wZW5PJzrGejdmMN"
    };

    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    console.log(accessKey, secretAccessKey)
    try {
        const stream = fs.createReadStream(`${jsonBase}/${nftJsonFiles[0]}`);
        const options = {
            pinataMetadata: {
                name: "MyCustomName",
                keyvalues: {
                    customKey: 'customValue',
                    customKey2: 'customValue2'
                }
            },
            pinataOptions: {
                cidVersion: 0
            }
        };
        //   let tokenUrl = [];
        const result = await pinata
            .pinJSONToIPFS(metaDataJson, options)
            .then((res) => {
                console.log(res);
                return res;
            })
            .catch((err) => {
                console.log(err);
            });

        return result;
    } catch (err) {
        console.log(err);
    }


}

pinFileToIPFS();