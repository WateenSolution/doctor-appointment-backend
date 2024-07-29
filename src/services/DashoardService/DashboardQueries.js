const { executeQuery } = require("../../utils/dbUtils");

const DashboardQueries = {
  getFilterPersonInfo: (role_id, qualification_specialisation) => {
    let sqlQuery = `SELECT *, rate.average_rating ,rate.total_reviews
                    FROM users AS u 
                    JOIN roles AS r ON u.role_id = r.id 
                    AND r.id = ?`;

    // Add qualification_specialisation conditionally
    if (qualification_specialisation) {
      sqlQuery += ` AND qualification_specialisation = ?`;
    }

    sqlQuery += ` LEFT JOIN rating AS rate ON u.username = rate.doctor_name 
                  ORDER BY rate.average_rating;`;

    // Create values array based on the presence of qualification_specialisation
    let values = [role_id];
    if (qualification_specialisation) {
      values.push(qualification_specialisation);
    }

    return executeQuery(sqlQuery, values);
  },
  getTotalUsers: () => {
    let sqlQuery = `SELECT count(*) As counter FROM users ;`;

    let values = [];

    return executeQuery(sqlQuery, values);
  },
};

module.exports = DashboardQueries;
