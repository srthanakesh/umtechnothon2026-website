const supabase = require('../supabaseConfig');

// Get all rubrics
const getAllRubrics = async () => {
  const { data, error } = await supabase
    .from('rubrics')
    .select('*');
  if (error) throw error;
  return data;
};

// Get rubrics by task ID
const getRubricsByTaskId = async (task_id) => {
  const { data, error } = await supabase
    .from('rubrics')
    .select('*')
    .eq('task_id', task_id);
  if (error) throw error;
  return data;
};

// Get rubric by ID
const getRubricById = async (rubric_id) => {
  const { data, error } = await supabase
    .from('rubrics')
    .select('*')
    .eq('rubric_id', rubric_id)
    .single();
  if (error) throw error;
  return data;
};

// Insert a new rubric
const insertRubric = async (rubricData) => {
  const { data, error } = await supabase
    .from('rubrics')
    .insert([{
      task_id: rubricData.task_id,
      rubric_name: rubricData.rubric_name,
      rubric_description: rubricData.rubric_description,
    }])
    .select();
  if (error) throw error;
  return data[0];
};

module.exports = {
  getAllRubrics,
  getRubricsByTaskId,
  getRubricById,
  insertRubric
};