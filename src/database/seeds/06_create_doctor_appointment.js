/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Check if there are any existing doctor appointments
  const appointment = await knex("doctor_appointment").first();

  if (!appointment) {
    await knex("doctor_appointment").insert([
      {
        doctor_name: "Doctor",
        booked_slots: JSON.stringify([{ time: "01:00:00", status: "true" }]),
      },
    ]);
  }
};
