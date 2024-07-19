/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const role_has_permissions = await knex("role_has_permissions").first();

  // if (role_has_permissions) {
  //   await knex("role_has_permissions").insert([]);
  // }
};
