/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const user = await knex("users").first();
  const defaultPassword =
    "$2b$10$JaYxNrSJ/Yt165/9YUAUEOVFQcVkrLmUCPOmEBzf3S0/jYuifjZiS";

  const roles = await knex("roles")
    .whereIn("name", ["Doctor", "Patient"])
    .select();

  if (!user) {
    await knex("users").insert([
      {
        role_id: roles.find((item) => item.name == "Doctor")?.id,
        username: "Doctor",
        email: "doctor@gmail.com",
        phone_number: "1234567890",
        password: defaultPassword,
        image: "doctor_image.jpg",
        qualifications: "MBBS, MD",
        qualification_specialisation: "Cardiology",
        availability_timing: "9AM - 5PM",
        remote_inperson: "In-Person",
        location: "New York",
        experience: "10 years",
        certificates: "Board Certified",
        doctor_fee: "200",
        about: "Experienced cardiologist with 10 years of practice.",
      },
      {
        role_id: roles.find((item) => item.name == "Patient")?.id,
        username: "Patient",
        email: "patient@gmail.com",
        phone_number: "0987654321",
        password: defaultPassword,
        image: "patient_image.jpg",
        qualifications: "",
        qualification_specialisation: "",
        availability_timing: "",
        remote_inperson: "",
        location: "",
        experience: "",
        certificates: "",
        doctor_fee: "",
        about: "",
      },
    ]);
  }
};
