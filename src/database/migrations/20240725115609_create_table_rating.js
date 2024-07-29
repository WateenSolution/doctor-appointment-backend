/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const tableName = "rating";

exports.up = async function (knex) {
  const tableExists = await knex.schema.hasTable(tableName);

  if (!tableExists) {
    return await knex.schema.createTable(tableName, (table) => {
      table.bigIncrements("id").unsigned().primary();
      table.string("doctor_name").notNullable(); // Changed from doctor_id to doctor_name
      table.decimal("average_rating", 2, 1).defaultTo(0); // Rating between 0 and 5 stars with 1 decimal place
      table.integer("total_reviews").defaultTo(0); // Total number of reviews
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));

      table.foreign("doctor_name").references("username").inTable("users");
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
