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
