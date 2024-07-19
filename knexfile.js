const { config } = require("./src/config");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: "mysql2",
  connection: {
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.name,
    port: config.db.port,
    // options: {
    //   encrypt: true, // If using encryption for SQL Server
    //   trustServerCertificate: true,
    // },
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./src/database/migrations",
  },
  seeds: {
    directory: "./src/database/seeds",
  },
};
