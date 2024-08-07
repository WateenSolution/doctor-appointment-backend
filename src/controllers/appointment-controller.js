const httpStatus = require("http-status");
const logger = require("../config/logger");
const AppointmentService = require("../services/AppointmentService/AppointmentService");

const AppointmentController = {
  getUserById: async (req, res) => {
    try {
      const obj = await AppointmentService.getUserById(req);

      const { message } = obj.response;
      const { data } = obj.response;

      res.status(obj.statusCode).send({ message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  },
  appAvailableTime: async (req, res) => {
    try {
      const obj = await AppointmentService.appAvailableTime(req);
      const { message } = obj.response;
      const { data } = obj.response;

      res.status(obj.statusCode).send({ message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  },
  addRatings: async (req, res) => {
    try {
      const obj = await AppointmentService.addRatings(req);
      const { message } = obj.response;
      const { data } = obj.response;

      res.status(obj.statusCode).send({ message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  },
  getAppointTime: async (req, res) => {
    try {
      const obj = await AppointmentService.getAppointTime(req);

      const { message } = obj.response;
      const { data } = obj.response;

      res.status(obj.statusCode).send({ message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  },
  addPatientForm: async (req, res) => {
    try {
      const obj = await AppointmentService.addPatientForm(req);

      const { message } = obj.response;
      const { data } = obj.response;

      res.status(obj.statusCode).send({ message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  },
  getPatAppList: async (req, res) => {
    try {
      const obj = await AppointmentService.getPatAppList(req);

      const { message } = obj.response;
      const { data } = obj.response;

      res.status(obj.statusCode).send({ message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  },
  getDocAppList: async (req, res) => {
    try {
      const obj = await AppointmentService.getDocAppList(req);

      const { message } = obj.response;
      const { data } = obj.response;

      res.status(obj.statusCode).send({ message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  },
};

module.exports = AppointmentController;
