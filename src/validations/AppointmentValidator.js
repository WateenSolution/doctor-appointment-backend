const Joi = require("joi");
const { passwordMessage, passwordRegExp } = require("../utils");
const AppointmentValidator = (type) => {
  switch (type) {
    case "add-patient-form": {
      return Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        doctor: Joi.string().required(),
        appointmentTime: Joi.string()
          .required()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/) // Validate time in HH:mm:ss format
          .messages({
            "string.pattern.base": "appointmentTime must be in HH:mm:ss format",
          }),
        notes: Joi.string().required(),
        userId: Joi.number().integer(),
      });
    }

    default: {
      return null;
    }
  }
};

module.exports = AppointmentValidator;
