var mysql = require("mysql2");
const config = require("./config");
var dbConnection = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  database: config.db.name,
  password: config.db.password,
  port: config.db.port,
});
const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  database: config.db.name,
  password: config.db.password,
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 10,
  port: config.db.port,
});

dbConnection.connect(function (err) {
  if (err) throw err;

  console.log("DB connected successfully");
});
dbConnection.end(() => {});

module.exports = pool;
