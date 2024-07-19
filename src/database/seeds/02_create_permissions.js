/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const permissions = await knex("permissions").first();
  if (!permissions) {
    await knex("permissions").insert([{ name: "Write Data" }]);
  }
};
