const logError = (err) => {
  console.error(err);
};

const logErrorMiddleware = (err, req, res, next) => {
  logError(err);
  next(err);
};

const returnError = (statusCode, message) => {
  return {
    statusCode,
    response: {
      status: false,
      code: statusCode,
      message,
    },
  };
};
const returnSuccess = (statusCode, message, data = {}) => {
  return {
    statusCode,
    response: {
      status: true,
      code: statusCode,
      message,
      data,
    },
  };
};

const getPagination = (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  return {
    limit,
    offset,
  };
};

module.exports = {
  logError,
  logErrorMiddleware,
  returnError,
  returnSuccess,
  getPagination,
};
