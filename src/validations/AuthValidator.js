const Joi = require("joi");
const { passwordMessage, passwordRegExp } = require("../utils");
const AuthValidator = (type) => {
  switch (type) {
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
        username: Joi.string().required(),
        email: Joi.string()
          .email({ tlds: { allow: false } })
          .required(),
        password: Joi.string()
          .required()
          .regex(passwordRegExp, passwordMessage),
        role_id: Joi.number().required(),

        phone_number: Joi.string().required(),
        image: Joi.string().uri().required(),
        qualifications: Joi.string().optional(),
        qualification_specialisation: Joi.string().optional(),
        availability_timing: Joi.string().optional(),
        remote_inperson: Joi.string().optional(),
        location: Joi.string().optional(),
        experience: Joi.string().optional(),
        certificates: Joi.string().optional(),
        doctor_fee: Joi.string().optional(),
        about: Joi.string().optional(),
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
