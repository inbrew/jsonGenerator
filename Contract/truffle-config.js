const HDWalletProvider = require("@truffle/hdwallet-provider");
const { address, privateKey, polygonTestNetRpcURL } = require("./env-config");

module.exports = {
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    polygonTest: {
      provider: () => new HDWalletProvider(privateKey, polygonTestNetRpcURL),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },

  mocha: {},

  compilers: {
    solc: {
      version: "0.8.0",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};
