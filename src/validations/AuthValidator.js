const Joi = require("joi");
const { passwordMessage, passwordRegExp } = require("../utils");
const AuthValidator = (type) => {
  switch (type) {
    case "add-user": {
      return Joi.object({
        username: Joi.string().required(),
        email: Joi.string()
          .email({ tlds: { allow: false } })
          .required(),
        password: Joi.string()
          .required()
          .regex(passwordRegExp, passwordMessage),
        role_name: Joi.string().required(),
      });
    }
    case "login": {
      return Joi.object({
        username: Joi.string().required(),
        password: Joi.string()
          .required()
          .regex(passwordRegExp, passwordMessage),
      });
    }

    case "change-password": {
      return Joi.object({
        old_password: Joi.string().required(),
        new_password: Joi.string()
          .required()
          .regex(passwordRegExp, passwordMessage),
      });
    }
    case "forget-password": {
      return Joi.object({
        email: Joi.string()
          .email({ tlds: { allow: false } })
          .required(),
      });
    }
    case "update-user-info": {
      return Joi.object({});
    }

    case "update-user": {
      return Joi.object({
        user_id: Joi.number().required(),
        username: Joi.string().required(),
        email: Joi.string()
          .email({ tlds: { allow: false } })
          .required(),
        role_name: Joi.string().required(),
      });
    }
    default: {
      return null;
    }
  }
};

module.exports = AuthValidator;
