const supabase = require("../supabaseConfig");

const getAllParticipants = async () => {
  const { data, error } = await supabase.from("participants").select("*");
  if (error) throw error;
  return data;
};

const insertParticipant = async (participant) => {
  try {
    const { data, error } = await supabase
      .from("participants")
      .insert([participant])
      .select();

    if (error) {
      throw error;
    }

    return data[0]; // Return the first inserted participant
  } catch (err) {
    console.error("Error during insert:", err);
    return { error: err.message }; // Return the error message
  }
};

// Check is participant exists or not
const getParticipantByEmail = async (email, includePassword = false) => {
  try {
    const fields = includePassword
      ? "participant_id, full_name, university, email, password_hash, team_id, role"
      : "participant_id"; // Only need ID for registration

    const { data, error } = await supabase
      .from("participants")
      .select(fields)
      .eq("email", email)
      .maybeSingle();

    if (error) throw error;

    return { data };
  } catch (err) {
    console.error("Error checking email in DB:", err);
    return { error: err.message };
  }
};

const getParticipantByFullName = async (full_name) => {
  const { data, error } = await supabase
    .from("participants")
    .select("*")
    .eq("full_name", full_name)
    .single();
  if (error) throw error;
  return data;
};

const getParticipantById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("participants")
      .select("*")
      .eq("participant_id", id)
      .single();

    if (error) throw error;

    return { data };
  } catch (err) {
    console.error("Error fetching participant by ID:", err);
    return { error: err.message };
  }
};

module.exports = {
  getAllParticipants,
  getParticipantByFullName,
  insertParticipant,
  getParticipantByEmail,
  getParticipantById,
};
