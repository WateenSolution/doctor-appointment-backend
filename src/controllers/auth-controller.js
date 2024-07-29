const httpStatus = require("http-status");
const AuthService = require("../services/AuthService/AuthService");
const TokenService = require("../services/TokenService");
const logger = require("../config/logger");
const AuthQueries = require("../services/AuthService/AuthQueries");

const AuthController = {
  getUsers: async (req, res) => {
    /* 
      #swagger.tags = ['Auth']
      #swagger.summary = ''
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
          
          }
        } 
      }
    */

    try {
      const obj = await AuthService.getUsers(req);
      const { message } = obj.response;
      const { data } = obj.response;
      if (obj?.statusCode == httpStatus.OK) {
        res.status(obj.statusCode).send({ message, data });
      } else {
        res.status(obj.statusCode).send({ message });
      }
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  },

  login: async (req, res) => {
    try {
      const obj = await AuthService.login(req);

      const { message } = obj.response;
      const { data } = obj.response;

      let token = "";
      let user = {};
      if (data) {
        let token_user = {};

        token_user.id = data?.id;
        token_user.name = data?.name;
        token_user.email = data?.email;

        user = data;
        token = await TokenService.generateAuthTokens(token_user);
      }

      if (obj?.statusCode == httpStatus.OK) {
        res.status(obj.statusCode).send({ message, token, user });
      } else {
        res.status(obj.statusCode).send({ message });
      }
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  },

  logout: async (req, res) => {
    try {
      const obj = await AuthService.logout(req);
      const { message } = obj.response;
      const { data } = obj.response;
      res.status(obj.statusCode).send({ message });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  },

  forgetPassword: async (req, res) => {
    try {
      const obj = await AuthService.forgetPassword(req);
      const { message } = obj.response;

      const { data } = obj.response;

      res.status(obj.statusCode).send({ message });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  },

  // Reset New Password
  resetPassword: async (req, res) => {
    /* 
      #swagger.tags = ['Auth']
      #swagger.summary = ''
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              id: "number",
              password: "string"
            },   
            example: {
              id: "number",
              password: "string"
            }  
          }
        } 
      } 
    */
    try {
      const obj = await AuthService.resetPassword(req);

      const { message } = obj.response;

      res.status(obj.statusCode).send({ message });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  },

  // Change Old Password
  changePassword: async (req, res) => {
    /* 
      #swagger.tags = ['Auth']
      #swagger.summary = ''
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              id: "number",
              password: "string"
            },   
            example: {
              id: "number",
              password: "string"
            }  
          }
        } 
      } 
    */
    try {
      const obj = await AuthService.changePassword(req);

      const { message } = obj.response;

      res.status(obj.statusCode).send({ message });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  },

  updateUser: async (req, res) => {
    /*
      #swagger.tags = ['Auth']
      #swagger.summary = ''
      
    */

    try {
      const obj = await AuthService.updateUser(req);

      const { message } = obj.response;
      const { data } = obj.response;

      res.status(obj.statusCode).send({ message });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  },

  getUserById: async (req, res) => {
    /*
      #swagger.tags = ['Auth']
      #swagger.summary = ''
      
    */

    try {
      const obj = await AuthService.getUserById(req);

      const { message } = obj.response;
      const { data } = obj.response;

      res.status(obj.statusCode).send({ message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  },
};

module.exports = AuthController;
