const { executeQuery } = require("../../utils/dbUtils");

const DashboardQueries = {
  getFilterPersonInfo: (role_id, qualification_specialisation) => {
    let sqlQuery = `SELECT u.*, rate.average_rating ,rate.total_reviews
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
  getTotalUsers: (username) => {
    let sqlQuery = `SELECT r.average_rating,r.total_reviews from rating as r join users as u where r.doctor_name=u.username And u.username=? ;`;

    let values = [username];

    return executeQuery(sqlQuery, values);
  },
  getBookPatient: (username) => {
    let sqlQuery = `SELECT pa.*,u.image from patient_appointments as pa join users as u where pa.user_id=u.id And doctor=?  ;`;

    let values = [username];

    return executeQuery(sqlQuery, values);
  },
};

module.exports = DashboardQueries;
