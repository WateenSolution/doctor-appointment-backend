const patientAppointmentsTable = "patient_appointments";
const usersTable = "users";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const tableExists = await knex.schema.hasTable(patientAppointmentsTable);

  if (!tableExists) {
    return await knex.schema.createTable(patientAppointmentsTable, (table) => {
      table.bigIncrements("id").unsigned().primary();

      table.bigInteger("user_id").unsigned().notNullable();
      table.string("first_name", 255).notNullable();
      table.string("last_name", 255).notNullable();
      table.string("doctor", 255).notNullable();
      table.time("appointment_time").notNullable();
      table.text("notes");
      table
        .enum("status", ["pending", "approved", "disapproved"])
        .defaultTo("pending")
        .notNullable();

      // Set default doc_rating to 0 and check the rating is between 1 and 5
      table
        .float("doc_rating")
        .notNullable()
        .unsigned()
        .defaultTo(0)
        .checkBetween([0, 5]);

      // Add the rating_status column
      table
        .enum("rating_status", ["pending", "completed"])
        .defaultTo("pending")
        .notNullable();

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));

      // Add foreign key constraint
      table.foreign("user_id").references("id").inTable(usersTable);
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(patientAppointmentsTable);
};
