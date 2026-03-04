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

const updateParticipant = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from("participants")
      .update(updates) //{ password_hash: '...', is_verified: true }
      .eq("participant_id", id)
      .select()
      .single();

    if (error) throw error;
    return { data };
  } catch (err) {
    console.error("Error updating participant:", err);
    return { error: err.message };
  }
};

// Check is participant exists or not
const getParticipantByEmail = async (email, includePassword = false) => {
  try {
    const fields = includePassword
      ? "participant_id, full_name, email, password_hash, is_verified, role, team_id"
      : "participant_id, email, is_verified";

    const { data, error } = await supabase
      .from("participants")
      .select(fields)
      .ilike("email", email.trim()) 
      .maybeSingle();

    if (error) throw error;
    
    //returns the actual user object
    return { data }; 
  } catch (err) {
    console.error("DB Error:", err);
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
  updateParticipant, 
};
