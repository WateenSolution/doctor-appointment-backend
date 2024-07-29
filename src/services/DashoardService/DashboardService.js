const httpStatus = require("http-status");
const NodeCache = require("node-cache");
const { config } = require("../../config");
const { http } = require("../../http");
const responseHandler = require("../../helper/responseHandler");
const DashboardQueries = require("./DashboardQueries");
const { responseMessage } = require("../../helper");
const myCache = new NodeCache();
const DashboardService = {
  getPerInfo: async (req) => {
    try {
      let message = "Get Person Data Successfully";
      let statusCode = httpStatus.OK;

      const getAllDoctorsDetails = req?.user;
      let total_users = await DashboardQueries.getTotalUsers();

      const data = { getAllDoctorsDetails, total_users };

      return responseHandler.returnSuccess(statusCode, message, data);
    } catch (err) {
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        responseMessage(err)
      );
    }
  },
  getFilterOrAllDoc: async (req) => {
    try {
      let message = "Get Doctor Data Successfully";
      let statusCode = httpStatus.OK;
      const { qualification_specialisation } = req?.body;
      let getAllFilterDoc = await DashboardQueries.getFilterPersonInfo(
        1,
        qualification_specialisation
      );

      const data = { getAllFilterDoc };

      return responseHandler.returnSuccess(statusCode, message, data);
    } catch (err) {
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        responseMessage(err)
      );
    }
  },
};

module.exports = DashboardService;
