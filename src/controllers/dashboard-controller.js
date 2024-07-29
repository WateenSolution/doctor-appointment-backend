const httpStatus = require("http-status");
const logger = require("../config/logger");
const DashboardService = require("../services/DashoardService/DashboardService");

const DashboardController = {
  getPerInfo: async (req, res) => {
    try {
      const obj = await DashboardService.getPerInfo(req);

      const { message } = obj.response;
      const { data } = obj.response;

      res.status(obj.statusCode).send({ message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  },
  getFilterOrAllDoc: async (req, res) => {
    try {
      const obj = await DashboardService.getFilterOrAllDoc(req);

      const { message, data } = obj.response;

      res.status(obj.statusCode).send({ message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  },
};

module.exports = DashboardController;
