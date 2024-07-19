/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const user = await knex("users").first();
  const defaultPassword =
    "$2b$10$DwaD.f0.6ocAoDrm74Tjkei2mG8AbeQeuS2sL1xOzw466xVtp4WE2";

  const roles = await knex("roles")
    .whereIn("name", ["Doctor", "Patient"])
    .select();

  if (!user) {
    await knex("users").insert([
      {
        role_id: roles.find((item) => item.name == "Doctor")?.id,
        username: "Doctor",
        email: "doctor@gmail.com",
        password: defaultPassword,
      },
      {
        role_id: roles.find((item) => item.name == "Patient")?.id,
        username: "Patient",
        email: "patient@gmail.com",
        password: defaultPassword,
      },
    ]);
  }
};
