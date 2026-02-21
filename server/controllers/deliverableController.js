const deliverableModel = require('../models/deliverableModel');

// Get all deliverables
const getAllDeliverables = async (req, res) => {
  try {
    const deliverables = await deliverableModel.getAllDeliverables(); // Fetch all deliverables
    res.status(200).json(deliverables); // Send the data as JSON
  } catch (error) {
    console.error('Error fetching deliverables:', error.message);
    res.status(500).json({ error: 'Failed to fetch deliverables' });
  }
};

// Get a deliverable by ID
const getDeliverableById = async (req, res) => {
  const { id } = req.params;

  try {
    const deliverable = await deliverableModel.getDeliverableById(id); // Fetch deliverable by ID
    if (!deliverable) {
      return res.status(404).json({ error: 'Deliverable not found' });
    }
    res.status(200).json(deliverable); // Send the deliverable as JSON
  } catch (error) {
    console.error('Error fetching deliverable by ID:', error.message);
    res.status(500).json({ error: 'Failed to fetch deliverable by ID' });
  }
};

const getDeliverableByTeamAndTask = async (req, res) => {
  try {
    const { team_id, task_id } = req.params;
    
    if (!team_id || !task_id) {
      return res.status(400).json({ error: 'Team ID and Task ID are required' });
    }
    
    const deliverable = await deliverableModel.getDeliverableByTeamAndTask(team_id, task_id);
    
    if (!deliverable) {
      return res.status(404).json({ error: 'Deliverable not found for this team and task' });
    }
    
    res.json(deliverable);
  } catch (error) {
    console.error('Error fetching deliverable by team and task:', error);
    res.status(500).json({ error: error.message });
  }
};

// Create a new deliverable
const createDeliverable = async (req, res) => {
  const { description, submission_link, team_id, task_id } = req.body;

  try {
    // Check if a deliverable already exists for this team and task
    const existingDeliverable = await deliverableModel.getDeliverableByTeamAndTask(team_id, task_id);

    // If a deliverable already exists, reject the creation
    if (existingDeliverable) {
      return res.status(409).json({ error: "Your team already has a submission for this task." });
    }

    const newDeliverable = await deliverableModel.createDeliverable({
      description,
      submission_link,
      team_id,
      task_id,
      submitted_at: new Date().toISOString(), // Add the current timestamp
    }); // Create a new deliverable
    res.status(201).json(newDeliverable); // Send the created deliverable as JSON
  } catch (error) {
    console.error('Error inserting deliverable into database:', error.message);
    res.status(500).json({ error: 'Error inserting deliverable into database:' });
  }
};

// Update a deliverable by ID
const updateDeliverableById = async (req, res) => {
  const { id } = req.params;
  const { description, submission_link, task_id } = req.body;

  try {
    const updatedDeliverable = await deliverableModel.updateDeliverableById(id, {
      description,
      submission_link,
      team_id,
      task_id,
    }); // Update the deliverable
    if (!updatedDeliverable) {
      return res.status(404).json({ error: 'Deliverable not found' });
    }
    res.status(200).json(updatedDeliverable); // Send the updated deliverable as JSON
  } catch (error) {
    console.error('Error updating deliverable:', error.message);
    res.status(500).json({ error: 'Failed to update deliverabdle' });
  }
};

// Delete a deliverable by ID
const deleteDeliverableById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDeliverable = await deliverableModel.deleteDeliverableById(id); // Delete the deliverable
    if (!deletedDeliverable) {
      return res.status(404).json({ error: 'Deliverable not found' });
    }
    res.status(200).json({ message: 'Deliverable deleted successfully' }); // Send success message
  } catch (error) {
    console.error('Error deleting deliverable:', error.message);
    res.status(500).json({ error: 'Failed to delete deliverable' });
  }
};

module.exports = {
  getAllDeliverables,
  getDeliverableById,
  getDeliverableByTeamAndTask,
  createDeliverable,
  updateDeliverableById,
  deleteDeliverableById,
};