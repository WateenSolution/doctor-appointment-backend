const { executeQuery } = require("../../utils/dbUtils");

const AlarmQueries = {
  getDocsFromDepts: (dept_name, role_id) => {
    let sqlQuery = `SELECT * FROM users where qualification_specialisation=? And role_id=? ;`;

    let values = [dept_name, role_id];

    return executeQuery(sqlQuery, values);
  },
};

module.exports = AlarmQueries;
