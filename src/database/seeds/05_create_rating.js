/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const tableName = "rating";

  // Deletes ALL existing entries
  await knex(tableName).del();

  // Inserts seed entries
  await knex(tableName).insert([
    {
      doctor_name: "Doctor",
      average_rating: 4.5,
      total_reviews: 10,
    },
  ]);
};
