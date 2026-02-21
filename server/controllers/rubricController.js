const rubricModel = require('../models/rubricModel');

// Get all rubrics or filter by task_id
const getAllRubrics = async (req, res) => {
  try {
    const { task_id } = req.query;
    
    let rubrics;
    if (task_id) {
      rubrics = await rubricModel.getRubricsByTaskId(task_id);
    } else {
      rubrics = await rubricModel.getAllRubrics();
    }
    
    res.json(rubrics);
  } catch (error) {
    console.error('Error fetching rubrics:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get rubric by ID
const getRubricById = async (req, res) => {
  try {
    const { id } = req.params;
    const rubric = await rubricModel.getRubricById(id);
    
    if (!rubric) {
      return res.status(404).json({ error: 'Rubric not found' });
    }
    
    res.json(rubric);
  } catch (error) {
    console.error('Error fetching rubric by ID:', error);
    res.status(500).json({ error: error.message });
  }
};

// Create a new rubric
const createRubric = async (req, res) => {
  try {
    const { task_id, rubric_name, rubric_description, max_points } = req.body;
    
    if (!task_id || !rubric_name) {
      return res.status(400).json({ error: 'Task ID and rubric name are required' });
    }
    
    const rubric = await rubricModel.insertRubric({
      task_id,
      rubric_name,
      rubric_description: rubric_description || '',
    });
    
    res.status(201).json({
      message: 'Rubric created successfully',
      rubric
    });
  } catch (error) {
    console.error('Error creating rubric:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllRubrics,
  getRubricById,
  createRubric,
}