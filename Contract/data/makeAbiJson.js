const fs = require("fs");
const path = require("path");

const basePath = __dirname;

let base = path.join(basePath, "../");

// json maker
const makeAbi = async (location, destination, address) => {
  console.log("location : ", location);
  console.log("destination : ", destination);
  console.log("path location : ", path.join(base, location));
  console.log("path destination : ", path.join(base, destination));
  const json = await fs.readFileSync(path.join(base, location), {
    encoding: "utf-8",
  });

  await fs.writeFileSync(path.join(base, destination), makeData(json, address));
};

const makeData = (json, address) => {
  const abi = JSON.parse(json).abi;

  return JSON.stringify({
    abi: abi,
    address: address,
  });
};

module.exports = {
  makeAbi,
  makeData,
};
