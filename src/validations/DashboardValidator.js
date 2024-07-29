const Joi = require("joi");
const { passwordMessage, passwordRegExp } = require("../utils");
const DashboardValidator = (type) => {
  switch (type) {
    case "doc-info": {
      return Joi.object({
        username: Joi.string().required(),
        password: Joi.string()
          .required()
          .regex(passwordRegExp, passwordMessage),
      });
    }

    default: {
      return null;
    }
  }
};

module.exports = DashboardValidator;
