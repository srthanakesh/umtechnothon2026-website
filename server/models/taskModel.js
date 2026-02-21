const supabase = require('../supabaseConfig');

// Get all tasks
const getAllTasks = async () => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*');
  if (error) throw error;
  return data;
};

// Get task by ID
const getTaskById = async (task_id) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('task_id', task_id)
    .single();
  if (error) throw error;
  return data;
};

// Insert a new task
const insertTask = async (taskData) => {
  const { data, error } = await supabase
    .from('tasks')
    .insert([{
      task_name: taskData.task_name,
      task_description: taskData.task_description
    }])
    .select();
  if (error) throw error;
  return data[0];
};

module.exports = {
  getAllTasks,
  getTaskById,
  insertTask
};