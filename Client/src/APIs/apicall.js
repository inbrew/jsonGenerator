import axios from "axios";
axios.defaults.withCredentials = true;

// const data = require('../img/IMG_0307.JPG');

// config
const { localServerUrl } = require("../config");

// get api
export async function postApiCall(endpoint, data) {
  const result = await axios
    .post(`${localServerUrl}${endpoint}`, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });

  return result;
}
