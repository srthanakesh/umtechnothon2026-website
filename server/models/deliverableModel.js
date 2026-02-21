const supabase = require('../supabaseConfig');

// Get all deliverables
const getAllDeliverables = async () => {
  const { data, error } = await supabase
    .from('deliverables') // Specify the 'deliverables' table
    .select('*'); // Select all columns
  if (error) {
    console.error('Error fetching all deliverables:', error.message);
    throw error;
  }
  return data;
};

// Get a deliverable by ID
const getDeliverableById = async (deliverable_id) => {
  const { data, error } = await supabase
    .from('deliverables') // Specify the 'deliverables' table
    .select('*')
    .eq('deliverable_id', deliverable_id) // Filter by deliverable_id
    .single(); // Expect a single row
  if (error) {
    console.error('Error fetching deliverable by ID:', error.message);
    throw error;
  }
  return data;
};

const getDeliverableByTeamAndTask = async (team_id, task_id) => {
  const { data, error } = await supabase
    .from('deliverables')
    .select('*')
    .eq('team_id', team_id)
    .eq('task_id', task_id)
    .single();
  
  if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
    throw error;
  }
  
  return data; // Returns null if no match is found
};

// Create a new deliverable
const createDeliverable = async (deliverableData) => {
  const { data, error } = await supabase
    .from('deliverables') // Specify the 'deliverables' table
    .insert([deliverableData]) // Insert the deliverable data
    .select(); // Ensure the inserted row is returned
    
  console.log('Supabase Response:', { data, error });
  if (error) {
    console.error('Error inserting deliverable into database:', error.message);
    throw error;
  }
  return data[0];
};

// Update a deliverable by ID
const updateDeliverableById = async (deliverable_id, deliverableData) => {
  const { data, error } = await supabase
    .from('deliverables') // Specify the 'deliverables' table
    .update(deliverableData) // Update the deliverable data
    .eq('deliverable_id', deliverable_id); // Filter by deliverable_id
  if (error) {
    console.error('Error updating deliverable:', error.message);
    throw error;
  }
  return data[0];
};

// Delete a deliverable by ID
const deleteDeliverableById = async (deliverable_id) => {
  const { data, error } = await supabase
    .from('deliverables') // Specify the 'deliverables' table
    .delete() // Delete the deliverable
    .eq('deliverable_id', deliverable_id); // Filter by deliverable_id
  if (error) {
    console.error('Error deleting deliverable:', error.message);
    throw error;
  }
  return data[0];
};

module.exports = {
  getAllDeliverables,
  getDeliverableById,
  getDeliverableByTeamAndTask,
  createDeliverable,
  updateDeliverableById,
  deleteDeliverableById,
};