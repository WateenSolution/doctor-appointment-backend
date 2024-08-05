const { executeQuery } = require("../../utils/dbUtils");

const AppointmentQueries = {
  getUserById: (id, role_id) => {
    let sqlQuery;
    let values = [];

    if (id) {
      sqlQuery = `SELECT * FROM users WHERE id = ? And role_id=?`;
      values = [id, role_id];
    } else {
      sqlQuery = `SELECT * FROM users where role_id=?`;
      values = [role_id];
    }

    return executeQuery(sqlQuery, values);
  },
  checkUserAvailable: (name) => {
    let sqlQuery = `
     SELECT COUNT(*) AS count FROM doctor_appointment WHERE doctor_name = ?;
 `;
    let values = [name];

    return executeQuery(sqlQuery, values);
  },
  checkDocBookSlot: (name, time) => {
    let sqlQuery = `
        SELECT user.username, user.availability_timing,da.booked_slots
        FROM doctor.users AS user
        JOIN doctor.doctor_appointment AS da
        ON user.username = da.doctor_name
        WHERE user.username = ?
          AND CAST(? AS TIME) BETWEEN 
              CAST(JSON_UNQUOTE(JSON_EXTRACT(user.availability_timing, '$[0].start')) AS TIME)
          AND 
              CAST(JSON_UNQUOTE(JSON_EXTRACT(user.availability_timing, '$[0].end')) AS TIME)
          AND NOT EXISTS (
            SELECT 1
            FROM JSON_TABLE(da.booked_slots, '$[*]' COLUMNS (
              slot_time TIME PATH '$.time',
              slot_status VARCHAR(5) PATH '$.status'
            )) AS booked
            WHERE booked.slot_time = CAST(? AS TIME)
              AND booked.slot_status = "true"
          );
    `;
    let values = [name, time, time];

    return executeQuery(sqlQuery, values);
  },

  updateBookSlot: (name, time) => {
    let sqlQuery = `
       UPDATE doctor_appointment
        SET booked_slots = JSON_ARRAY_APPEND(booked_slots, '$', JSON_OBJECT('time', ?, 'status', 'true'))
        WHERE doctor_name = ?;
    `;
    let values = [time, name];

    return executeQuery(sqlQuery, values);
  },
  updatePatientStatus: (name, time, status, user_id) => {
    let sqlQuery = `
        UPDATE patient_appointments
        SET status = ?
        WHERE doctor = ? 
        AND user_id = ? 
        AND appointment_time = ?;
    `;
    let values = [status, name, user_id, time];

    return executeQuery(sqlQuery, values);
  },
  addDoctor: (name, time) => {
    let sqlQuery = `
      INSERT INTO doctor_appointment (doctor_name, booked_slots, created_at, updated_at)
      VALUES (?, JSON_ARRAY(JSON_OBJECT('time', ?, 'status', 'true')), NOW(), NOW());
    `;
    let values = [name, time];

    return executeQuery(sqlQuery, values);
  },
  getTimeAppointAndBooked: (name) => {
    let sqlQuery = `
        SELECT user.username, user.availability_timing,da.booked_slots
        FROM doctor.users AS user
        JOIN doctor.doctor_appointment AS da
        ON user.username = da.doctor_name
        WHERE user.username = ?
          ;
    `;
    let values = [name];

    return executeQuery(sqlQuery, values);
  },
  getTimeAppointAfterHalfHour: (name) => {
    let sqlQuery = `
    WITH RECURSIVE half_hour_intervals AS (
        SELECT 
            CAST(JSON_UNQUOTE(JSON_EXTRACT(user.availability_timing, '$[0].start')) AS TIME) AS interval_start,
            CAST(JSON_UNQUOTE(JSON_EXTRACT(user.availability_timing, '$[0].end')) AS TIME) AS interval_end
        FROM doctor.users AS user
        WHERE user.username = ?
        UNION ALL
        SELECT 
            ADDTIME(interval_start, '00:30:00'), interval_end
        FROM 
            half_hour_intervals
        WHERE 
            ADDTIME(interval_start, '00:30:00') <= interval_end
    ),
    available_slots AS (
        SELECT 
            DATE_FORMAT(interval_start, '%H:%i:%s') AS available_time
        FROM 
            half_hour_intervals
        LEFT JOIN (
            SELECT 
                CAST(JSON_UNQUOTE(JSON_EXTRACT(slot.value, '$.time')) AS TIME) AS booked_time
            FROM 
                doctor.doctor_appointment AS da,
                JSON_TABLE(da.booked_slots, '$[*]' COLUMNS (value JSON PATH '$')) AS slot
            WHERE 
                da.doctor_name = ?
        ) AS booked
        ON 
            half_hour_intervals.interval_start = booked.booked_time
        WHERE 
            booked.booked_time IS NULL
    )
    SELECT 
        user.username, 
        JSON_ARRAYAGG(available_time) AS available_slots
    FROM 
        doctor.users AS user
    JOIN 
        available_slots 
    ON 
        user.username = ?
    GROUP BY 
        user.username;
`;

    let values = [name, name, name];

    return executeQuery(sqlQuery, values);
  },
  addPatientForm: (name) => {
    let sqlQuery = `
        SELECT user.username, user.availability_timing,da.booked_slots
        FROM doctor.users AS user
        JOIN doctor.doctor_appointment AS da
        ON user.username = da.doctor_name
        WHERE user.username = ?
          ;
    `;
    let values = [name];

    return executeQuery(sqlQuery, values);
  },
  addAppointmentPatForm: (
    firstName,
    lastName,
    doctor,
    appointmentTime,
    notes,
    user_id
  ) => {
    let sqlQuery = `INSERT INTO patient_appointments 
    (first_name, last_name, doctor, appointment_time, notes,user_id) VALUES (?, ?, ?, ?, ?,?);`;
    let values = [firstName, lastName, doctor, appointmentTime, notes, user_id];
    return executeQuery(sqlQuery, values);
  },
  getPatAppList: (user_id) => {
    let sqlQuery = `
        SELECT pa.*,u.image,u.remote_inperson,u.doctor_fee from patient_appointments as pa join users as u where pa.user_id=? And pa.doctor=u.username;
    `;
    let values = [user_id];

    return executeQuery(sqlQuery, values);
  },
};

module.exports = AppointmentQueries;
