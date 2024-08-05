const httpStatus = require("http-status");
const responseHandler = require("../../helper/responseHandler");
const logger = require("../../config/logger");
const jwt_decode = require("jwt-decode");
const bcrypt = require("bcrypt");

const AuthQueries = require("./AuthQueries");

const { config } = require("../../config");
const { resetPassword } = require("../../utils/html-templates/reset-password");
const { sendEmail, responseMessage } = require("../../helper");

const saltRounds = 10;

const AuthService = {
  login: async (req) => {
    try {
      let message = "Login Successful";
      let statusCode = httpStatus.OK;

      const { username, password } = req?.body;

      let user = await AuthQueries.checkUserExistByName(username);

      if (user.length == 0) {
        return responseHandler.returnError(
          httpStatus.BAD_REQUEST,
          "User Not Registered"
        );
      } else {
        user = user[0];

        const checkPassword = await bcrypt.compare(password, user?.password);

        if (!checkPassword) {
          return responseHandler.returnError(
            httpStatus.BAD_REQUEST,
            "Invalid Password"
          );
        }

        const getUserPermissions = await AuthQueries.getUserPermissions(
          user?.id
        );

        const permissions = getUserPermissions.map((row) => row?.name);
        user.permissions = permissions || [];
      }

      delete user.password;

      return responseHandler.returnSuccess(statusCode, message, user);
    } catch (err) {
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        responseMessage(err)
      );
    }
  },

  getUsers: async (req) => {
    try {
      let message = "Get Users Successful";
      let statusCode = httpStatus.OK;

      const getAllUsers = await AuthQueries.getAllUsers();

      // getAllUsers.forEach((obj) => {
      //   obj.station_name = null;
      // });

      const data = {
        items: getAllUsers,
      };

      return responseHandler.returnSuccess(statusCode, message, data);
    } catch (err) {
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        responseMessage(err)
      );
    }
  },

  logout: async (req) => {
    try {
      let message = "Logout Successfully";

      let statusCode = httpStatus.OK;

      const user = req?.user;

      let obj = {};

      return responseHandler.returnSuccess(statusCode, message, obj);
    } catch (err) {
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        responseMessage(err)
      );
    }
  },

  forgetPassword: async (req) => {
    try {
      const {
        username,
        email,
        password,
        role_id,
        phone_number,
        image,
        qualifications,
        qualification_specialisation,
        availability_timing,
        remote_inperson,
        location,
        experience,
        certificates,
        doctor_fee,
        about,
      } = req.body;

      // Check if user already exists
      const existingUser = await AuthQueries.checkUserExists(username, email);
      if (existingUser.length > 0) {
        const message = "User already exists";
        const statusCode = httpStatus.OK;
        return responseHandler.returnSuccess(statusCode, message, existingUser);
      }
      let hashPassword = null;
      if (password) {
        const salt = await bcrypt.genSalt(saltRounds);
        hashPassword = await bcrypt.hash(password, salt);
      }
      const result = await AuthQueries.signup(
        username,
        email,
        hashPassword,
        role_id,
        phone_number,
        image,
        qualifications,
        qualification_specialisation,
        availability_timing,
        remote_inperson,
        location,
        experience,
        certificates,
        doctor_fee,
        about
      );
      const message = "User registered successfully";
      const statusCode = httpStatus.CREATED;
      return responseHandler.returnSuccess(statusCode, message, result);
    } catch (err) {
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        responseMessage(err)
      );
    }
  },
  updateUser: async (req) => {
    try {
      let message = "User Updated Successfully";
      let statusCode = httpStatus.OK;

      const {
        username,
        email,
        password,
        station_name,
        role_name,
        user_id,
        stations,
      } = req?.body;

      let hashPassword = null;

      if (password) {
        const salt = await bcrypt.genSalt(saltRounds);
        hashPassword = await bcrypt.hash(password, salt);
      }

      // let checkUserExists = await AuthQueries.checkUserExists(username);

      // if (user.length > 0) {
      //   return responseHandler.returnError(
      //     httpStatus.BAD_REQUEST,
      //     "User Already Exists"
      //   );
      // }

      const checkRoleExists = await AuthQueries.checkRoleExists(role_name);

      if (checkRoleExists.length == 0) {
        return responseHandler.returnError(
          httpStatus.BAD_REQUEST,
          "Provide Valid Role Name"
        );
      }

      const updateUser = await AuthQueries.updateUser(
        username,
        email,
        hashPassword,
        checkRoleExists[0]?.id,
        user_id
      );

      if (updateUser?.affectedRows == 0) {
        return responseHandler.returnError(
          httpStatus.BAD_REQUEST,
          "Record not updated"
        );
      }

      const newUser = await AuthQueries.getUserByName(username);

      if (stations) {
        const deleteStations = await AuthQueries.deleteUserStations(user_id);
        let values = [];
        for (const station of stations) {
          values.push([newUser[0]?.id, station]);
        }
        if (values.length > 0) {
          const addUserStations = await AuthQueries.addUserStations(values);
        }
      }

      const data = {};

      return responseHandler.returnSuccess(statusCode, message, data);
    } catch (err) {
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        responseMessage(err)
      );
    }
  },

  getUserById: async (req) => {
    try {
      let message = "Get User";
      let statusCode = httpStatus.OK;

      const user_id = req?.params.id;

      const getUserById = await AuthQueries.getUserById(user_id);

      if (getUserById.length == 0) {
        return responseHandler.returnError(
          httpStatus.NOT_FOUND,
          "User Not Found"
        );
      }

      const data = getUserById[0];

      data.station_name = null;

      return responseHandler.returnSuccess(statusCode, message, data);
    } catch (err) {
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        responseMessage(err)
      );
    }
  },
  // Reset Password
  resetPassword: async (req) => {
    try {
      let message = "Password changed successfully";
      let statusCode = httpStatus.OK;
      const { id, password } = req?.body;

      let user = await AuthQueries.getUser(id);
      user = user[0];

      const salt = await bcrypt.genSalt(saltRounds);
      const hashPassword = await bcrypt.hash(password, salt);
      let updatePassword = await AuthQueries.updatePassword(
        hashPassword,
        user?.id
      );

      return responseHandler.returnSuccess(statusCode, message);
    } catch (err) {
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        responseMessage(err)
      );
    }
  },
  // Change Password
  changePassword: async (req) => {
    try {
      let message = "Password changed successfully";
      let statusCode = httpStatus.OK;
      const { old_password, new_password } = req?.body;
      const user = req?.user;
      const checkPassword = await bcrypt.compare(old_password, user?.password);

      if (!checkPassword) {
        return responseHandler.returnError(
          httpStatus.BAD_REQUEST,
          "Invalid Old Password"
        );
      }
      const salt = await bcrypt.genSalt(saltRounds);
      const hashPassword = await bcrypt.hash(new_password, salt);
      let updatePassword = await AuthQueries.updatePassword(
        hashPassword,
        user?.id
      );
      return responseHandler.returnSuccess(statusCode, message, updatePassword);
    } catch (err) {
      return responseHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        responseMessage(err)
      );
    }
  },
};

module.exports = AuthService;
