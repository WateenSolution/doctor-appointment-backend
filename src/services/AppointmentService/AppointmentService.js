const httpStatus = require("http-status");
const NodeCache = require("node-cache");
const { config } = require("../../config");
const { http } = require("../../http");
const responseHandler = require("../../helper/responseHandler");
const AppointmentQueries = require("./AppointmentQueries");
const { responseMessage } = require("../../helper");

const myCache = new NodeCache();
const AppointmentService = {
  getUserById: async (req) => {
    try {
      let message = "Get User";
      let statusCode = httpStatus.OK;

      const user_id = req?.params.id || null;

      const getUserById = await AppointmentQueries.getUserById(user_id, 1);

      if (getUserById.length == 0) {
        return responseHandler.returnError(
          httpStatus.NOT_FOUND,
          "User Not Found"
        );
      }

      const data = getUserById;

      data.station_name = null;

      return responseHandler.returnSuccess(statusCode, message, data);
    } catch (err) {
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        responseMessage(err)
      );
    }
  },
  appAvailableTime: async (req) => {
    try {
      let message = "Available Time checked successfully";
      let statusCode = httpStatus.OK;
      const { name, time } = req?.body;

      // Check if the time slot is available
      let docBookSlots = await AppointmentQueries.checkDocBookSlot(name, time);
      if (docBookSlots.length > 0) {
        // If available, book the time slot
        await AppointmentQueries.updateBookSlot(name, time);
        message = "Time slot booked successfully";
      } else {
        message = "Time slot is not available";
        statusCode = httpStatus.BAD_REQUEST;
      }
      const data = await AppointmentQueries.getTimeAppointAndBooked(name);
      return responseHandler.returnSuccess(statusCode, message, data);
    } catch (err) {
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        responseMessage(err)
      );
    }
  },
  getAppointTime: async (req) => {
    try {
      let message = "Get Avaible and booked time successfully";
      let statusCode = httpStatus.OK;

      const { name } = req?.body;

      const data = await AppointmentQueries.getTimeAppointAfterHalfHour(name);
      return responseHandler.returnSuccess(statusCode, message, data);
    } catch (err) {
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        responseMessage(err)
      );
    }
  },
  addPatientForm: async (req) => {
    try {
      let message = "Patient Form added successfully";
      let statusCode = httpStatus.OK;

      const userId = req?.user?.id;
      const { firstName, lastName, doctor, appointmentTime, notes } = req?.body;

      const data = await AppointmentQueries.addAppointmentPatForm(
        firstName,
        lastName,
        doctor,
        appointmentTime,
        notes,
        userId
      );
      return responseHandler.returnSuccess(statusCode, message, data);
    } catch (err) {
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        responseMessage(err)
      );
    }
  },
  getPatAppList: async (req) => {
    try {
      let message = "Get Appointment List of patients";
      let statusCode = httpStatus.OK;

      const user_id = req?.user?.id || null;

      const getPatientsAppList = await AppointmentQueries.getPatAppList(
        user_id
      );

      if (getPatientsAppList.length == 0) {
        return responseHandler.returnError(
          httpStatus.NOT_FOUND,
          "No Appointment Done Yet"
        );
      }

      const data = getPatientsAppList;

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
