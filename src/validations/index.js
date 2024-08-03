const httpStatus = require("http-status");

const AuthValidator = require("./AuthValidator");
const DashboardValidator = require("./DashboardValidator");
const AppointmentValidator = require("./AppointmentValidator");

const validate = (validator, type) => (req, res, next) => {
  const schema = getSchema(validator, type);
  if (schema) {
    // schema options
    const options = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true, // remove unknown props
      errors: {
        wrap: {
          label: "",
        },
      },
    };

    // validate request body against schema
    const { error, value } = schema.validate(req.body, options);

    if (error) {
      res.status(httpStatus.BAD_REQUEST).json({
        message: error.message,
        errors: error.details.map(
          // (detail, index) => `${index + 1}. ${detail.message}`
          (detail, index) => `${detail.message}`
        ),
      });
      // next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    } else {
      // on success replace req.body with validated value and trigger next middleware function

      // req.body = value;
      return next();
    }
  } else {
    res.status(httpStatus.NOT_FOUND).json({ message: "No Schema Exists" });
  }
};

const getSchema = (validator, type) => {
  switch (validator) {
    case "auth":
      return AuthValidator(type);
    case "dashboard":
      return DashboardValidator(type);
    case "appointment":
      return AppointmentValidator(type);
    default: {
      return null;
    }
  }
};

module.exports = validate;
