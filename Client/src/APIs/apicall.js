import axios from "axios";
axios.defaults.withCredentials = true;

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
