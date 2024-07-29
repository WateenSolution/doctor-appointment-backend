/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const tableName = "history";

exports.up = async function (knex) {
  const tableExists = await knex.schema.hasTable(tableName);

  if (!tableExists) {
    return await knex.schema.createTable(tableName, (table) => {
      table.bigIncrements("id").unsigned().primary();
      table.string("patient_name", 255).notNullable();
      table.string("doc_name", 255).notNullable();
      table.text("review").notNullable();
      table.integer("rating").notNullable().unsigned().checkBetween([1, 5]); // Assuming a rating between 1 and 5
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));

      // Optional: Add foreign key constraints if you have related tables
      // table.foreign("appointment_id").references("id").inTable("appointments");
      // table.foreign("patient_id").references("id").inTable("patients");
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
