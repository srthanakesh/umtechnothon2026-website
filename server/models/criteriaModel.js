const supabase = require('../supabaseConfig');

const getAllCriteria = async () => {
  const { data, error } = await supabase
    .from('criterias')
    .select('*');
  if (error) throw error;
  return data;
};

const getCriteriaByRubricId = async (rubric_id) => {
  const { data, error } = await supabase
    .from('criterias')
    .select('*')
    .eq('rubric_id', rubric_id);
  if (error) throw error;
  return data;
};


const insertCriteria = async (criteria) => {
  const { data, error } = await supabase
    .from("criterias")
    .insert([criteria])
    .select();
  if (error) throw error;
  return data[0];
};

const getCriteriaById = async (criteria_id) => {
  const { data, error } = await supabase
    .from("criterias")
    .select("*")
    .eq("criteria_id", criteria_id) 
    .single();
  if (error) throw error;
  return data;
};

module.exports = {
  getAllCriteria,
  getCriteriaByRubricId,
  getCriteriaById,
  insertCriteria
};