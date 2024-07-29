/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const tableName = "patient_appointments";

exports.up = async function (knex) {
  const tableExists = await knex.schema.hasTable(tableName);

  if (!tableExists) {
    return await knex.schema.createTable(tableName, (table) => {
      table.bigIncrements("id").unsigned().primary();
      table.string("first_name", 255).notNullable();
      table.string("last_name", 255).notNullable();
      table.string("doctor", 255).notNullable();
      table.timestamp("appointment_date").notNullable();
      table.timestamp("appointment_time").notNullable();
      table.string("medical_department", 255).notNullable();
      table.string("other_department", 255); // Optional, for "Others" department
      table.text("notes");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));

      // Add foreign key constraints if applicable
      // For example, if you have a `roles` table for doctors or other entities:
      // table.foreign("doctor_id").references("id").inTable("doctors");
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(tableName);
};
