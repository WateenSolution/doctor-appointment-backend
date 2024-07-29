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
      table.string("username", 255);
      table.string("email", 255);
      table.string("phone_number", 255);
      table.string("password", 255);
      table.text("image");
      table.string("qualifications", 255);
      table.string("qualification_specialisation", 255);
      table.string("availability_timing", 255);
      table.string("remote_inperson", 255);
      table.string("location", 255);
      table.string("experience", 255);
      table.string("certificates", 255);
      table.string("doctor_fee", 255);
      table.text("about");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
      table.timestamp("deleted_at");

      //  Add foreign key constraints
      table.foreign("role_id").references("id").inTable("roles");
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
