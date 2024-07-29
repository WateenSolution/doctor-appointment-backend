const httpStatus = require("http-status");
const NodeCache = require("node-cache");
const { config } = require("../../config");
const { http } = require("../../http");
const responseHandler = require("../../helper/responseHandler");
const AppointmentQueries = require("./AppointmentQueries");
const { responseMessage } = require("../../helper");
const myCache = new NodeCache();
const AppointmentService = {
  getDocsFromDepts: async (req) => {
    try {
      let message = "Get Doctor Data Successfully";
      let statusCode = httpStatus.OK;
      const { device_id } = req?.body;
      const getAllDoctorsDetails = req?.user;
      let total_users = await AppointmentQueries.getDocsFromDepts();

      const data = { getAllDoctorsDetails, total_users };

      return responseHandler.returnSuccess(statusCode, message, data);
    } catch (err) {
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        responseMessage(err)
      );
    }
  },
};

module.exports = AppointmentService;
