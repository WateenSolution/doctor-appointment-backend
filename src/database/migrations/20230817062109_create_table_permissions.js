/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = "permissions";

exports.up = async function (knex) {
  const tableExists = await knex.schema.hasTable(tableName);

  if (!tableExists) {
    return knex.schema.createTable(tableName, (table) => {
      table.bigIncrements("id").unsigned().primary();
      table.string("name", 255);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
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
