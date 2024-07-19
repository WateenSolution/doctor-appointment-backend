const { dbConnection } = require("../config"); // Import your database connection module

const executeQuery = (sqlQuery, values) => {
  return new Promise((resolve, reject) => {
    dbConnection.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.log("DB query Error: ", err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const insertQuery = (sqlQuery, values) => {
  return executeQuery(sqlQuery, values);
};

module.exports = { executeQuery, insertQuery };
