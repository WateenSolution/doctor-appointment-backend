/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = "role_has_permissions";

exports.up = async function (knex) {
  const tableExists = await knex.schema.hasTable(tableName);

  if (!tableExists) {
    return await knex.schema.createTable(tableName, (table) => {
      table.bigIncrements("id").unsigned().primary();
      table.bigInteger("role_id").unsigned();
      table.bigInteger("permission_id").unsigned();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));

      // Add foreign key constraints
      table.foreign("role_id").references("id").inTable("roles");
      table.foreign("permission_id").references("id").inTable("permissions");
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
