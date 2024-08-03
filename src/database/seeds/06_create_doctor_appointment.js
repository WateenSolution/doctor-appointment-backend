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
        booked_slots: JSON.stringify([
          { time: "02:00:00", status: "true" },
          { time: "02:30:00", status: "true" },
        ]),
      },
    ]);
  }
};
