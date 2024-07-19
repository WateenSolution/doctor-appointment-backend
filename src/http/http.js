const axios = require("axios");
const { BASE_URL } = require("../utils");
const { config } = require("../config/index");

const HTTP = {
  get: async (url, headers = {}, params = {}) => {
    try {
      const options = {
        headers: headers,
        params: params,
      };

      const res = await axios.get(`${url}`, options);

      return res?.data;
    } catch (error) {
      console.log(error);
      return error?.response;
    }
  },
  post: async (url, body, headers = {}, params = {}) => {
    try {
      const options = {
        headers: headers,
      };

      const res = await axios.post(`${url}`, body, options);

      return res;
    } catch (error) {
      console.log(error);
      return error?.response;
    }
  },
  put: async (url, body, params = {}, headers = {}, base_url = "") => {
    try {
      const res = await axios.put(`${url}`, body);

      return res;
    } catch (error) {
      console.log(error);
      return error?.response;
    }
  },

  postFormData: async (url, bodyFormData, headers = {}, params = {}) => {
    try {
      const options = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await axios.post(`${url}`, bodyFormData, options);

      return res?.data;
    } catch (error) {
      console.log(error);
      return error?.response;
    }
  },
};

module.exports = HTTP;
