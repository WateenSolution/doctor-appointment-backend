/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = "users";

exports.up = async function (knex) {
  const tableExists = await knex.schema.hasTable(tableName);

  if (!tableExists) {
    return await knex.schema.createTable(tableName, (table) => {
      table.bigIncrements("id").unsigned().primary();
      table.bigInteger("role_id").unsigned();
      table.bigInteger("organization_id").unsigned();
      table.string("username", 255);
      table.string("email", 255);
      table.string("phone_number", 255);
      table.string("password", 255);
      table.string("image", 255);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
      table.timestamp("deleted_at");

      //  Add foreign key constraints
      table.foreign("role_id").references("id").inTable("roles");
      table
        .foreign("organization_id")
        .references("id")
        .inTable("organizations");
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
