const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, "../.env") });
const rpcUrl = process.env.RPC_URL;

// web3
const Web3 = require("web3");
const web3 = new Web3(rpcUrl);

module.exports = {
    checkAddress: async (req, res) => {
        const result = await web3.utils.isAddress(req.body.data);
        console.log(req.body)
        if (result) {
            res.status(200).send({
                data: result,
                message: "Address is available!"
            })
        } else {
            res.status(200).send({
                data: result,
                message: "Address is non-available!"
            })
        }

    },

    checkNetwork: async (req, res) => {
        res.status(200).send({
            data: rpcUrl,
            message: "Network is it!"
        })
    }
}