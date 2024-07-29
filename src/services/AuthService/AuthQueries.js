const { dbConnection } = require("../../config");
const { executeQuery } = require("../../utils/dbUtils");

const AuthQueries = {
  signup: (
    username,
    email,
    password,
    role_id,
    phone_number,
    image,
    qualifications,
    qualification_specialisation,
    availability_timing,
    remote_inperson,
    location,
    experience,
    certificates,
    doctor_fee,
    about
  ) => {
    let sqlQuery = `INSERT INTO users (
      username, 
      email, 
      password, 
      role_id, 
      phone_number, 
      image,
      qualifications, 
      qualification_specialisation, 
      availability_timing, 
      remote_inperson, 
      location, 
      experience, 
      certificates, 
      doctor_fee, 
      about
    ) VALUES (?, ?, ?, ?, ?, ?,  ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    let values = [
      username,
      email,
      password,
      role_id,

      phone_number,
      image,
      qualifications,
      qualification_specialisation,
      availability_timing,
      remote_inperson,
      location,
      experience,
      certificates,
      doctor_fee,
      about,
    ];
    return executeQuery(sqlQuery, values);
  },
  checkUserExists: (username, email) => {
    const sqlQuery = `SELECT id, email, username FROM users WHERE (username = ? AND email = ?) AND deleted_at is ?;`;
    const values = [username, email, null];

    return executeQuery(sqlQuery, values);
  },

  // Not used
  login: (name, email, type, token, profile_image) => {
    return new Promise((resolve, reject) => {
      let sqlQuery = `INSERT INTO users (name, email, type, token, profile_image )  VALUES ( ?, ?, ?, ?, ? );`;
      let values = [name, email, type, token, profile_image];

      dbConnection.query(sqlQuery, values, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  },

  updateUserInfo: (user_id, curriculum, grade, phone_number, country) => {
    return new Promise((resolve, reject) => {
      let sqlQuery = `UPDATE users SET curriculum=?, grade=?, phone_number=?, country=? WHERE id = ?;`;
      let values = [curriculum, grade, phone_number, country, user_id];

      dbConnection.query(sqlQuery, values, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  },

  getUser: (id) => {
    return new Promise((resolve, reject) => {
      let sqlQuery = `SELECT users.*, roles.name as role
       FROM users LEFT JOIN roles on roles.id = users.role_id WHERE users.id="${id}" AND users.deleted_at is NULL;`;
      dbConnection.query(sqlQuery, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  },

  getUserByName: (username) => {
    const sqlQuery = `SELECT * from users WHERE username = ?`;
    const values = [username];

    return executeQuery(sqlQuery, values);
  },
  deleteUserStations: (userId) => {
    const sqlQuery = `DELETE from user_stations WHERE user_id = ?`;
    const values = [userId];

    return executeQuery(sqlQuery, values);
  },
  updateFCMToken: (fcm_token, user_id) => {
    return new Promise((resolve, reject) => {
      let sqlQuery = `UPDATE users SET fcm_token=? WHERE id = ?;`;
      let values = [fcm_token, user_id];

      dbConnection.query(sqlQuery, values, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  },

  updatePassword: (password, used_id) => {
    return new Promise((resolve, reject) => {
      let sqlQuery = `UPDATE users SET password=? WHERE id = ?;`;
      let values = [password, used_id];

      dbConnection.query(sqlQuery, values, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  },

  checkUserExistByName: (username) => {
    const sqlQuery = `SELECT users.id, users.username, users.email, users.password, roles.name as role FROM users 
      LEFT JOIN roles on roles.id = users.role_id WHERE users.username = ? AND users.deleted_at is NULL;`;
    const values = [username];

    return executeQuery(sqlQuery, values);
  },

  getAllUsers: () => {
    const sqlQuery = `SELECT 
    users.id, 
    users.username, 
    users.email, 
    DATE_FORMAT(users.created_at, '%Y-%m-%d %H:%i:%s') AS created_at, 
    organizations.name as station_name,
    roles.name as role,
    GROUP_CONCAT(user_stations.station_id) as user_stations
  FROM users 
  LEFT JOIN roles ON roles.id = users.role_id
  LEFT JOIN organizations ON organizations.id = users.organization_id
  LEFT JOIN user_stations ON user_stations.user_id = users.id
  WHERE users.deleted_at is NULL AND roles.id != 1 
  GROUP BY users.id
  ORDER BY users.id DESC;`;

    return executeQuery(sqlQuery);
  },

  getUserPermissions: (user_id) => {
    const sqlQuery = `SELECT permissions.name FROM users LEFT JOIN roles on roles.id = users.role_id 
    JOIN role_has_permissions ON role_has_permissions.role_id = roles.id 
    JOIN permissions ON permissions.id = role_has_permissions.permission_id WHERE users.id = ?;`;

    const values = [user_id];

    return executeQuery(sqlQuery, values);
  },

  checkRoleExists: (name) => {
    const sqlQuery = `SELECT * from roles WHERE name = ?`;
    const values = [name];

    return executeQuery(sqlQuery, values);
  },

  deleteUser: (user_id) => {
    const sqlQuery = `UPDATE users SET deleted_at = now() WHERE id = ?`;
    const values = [user_id];

    return executeQuery(sqlQuery, values);
  },

  addUserStations: (values) => {
    const sqlQuery = `INSERT INTO user_stations (user_id, station_id) 
      VALUES ?`;
    return executeQuery(sqlQuery, [values]);
  },
  updateUser: (username, email, password, role_id, user_id) => {
    const sqlQuery = `UPDATE users SET 
      username = COALESCE(?, username),
      email = COALESCE(?, email),
      password = COALESCE(?, password),
      role_id = COALESCE(?, role_id)
      WHERE id = ?;`;

    const values = [username, email, password, role_id, user_id];

    return executeQuery(sqlQuery, values);
  },

  getUserById: (user_id) => {
    let sqlQuery = `SELECT users.id, users.username, users.email, 
      DATE_FORMAT(users.created_at, '%Y-%m-%d %H:%i:%s') AS created_at,
      roles.name as role
      FROM users LEFT JOIN roles on roles.id = users.role_id WHERE users.id= ? AND users.deleted_at is NULL LIMIT 1;`;

    const values = [user_id];

    return executeQuery(sqlQuery, values);
  },
};

module.exports = AuthQueries;
