/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const roles = await knex("roles").first();
  if (!roles) {
    await knex("roles").insert([{ name: "Doctor" }, { name: "Patient" }]);
  }
};
