const httpStatus = require("http-status");
const logger = require("../config/logger");
const AppointmentService = require("../services/AppointmentService/AppointmentService");

const AppointmentController = {
  getDocsFromDepts: async (req, res) => {
    try {
      const obj = await AppointmentService.getDocsFromDepts(req);
      const { message, data } = obj.response;

      res.status(obj.statusCode).send({ message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  },
};

module.exports = AppointmentController;
