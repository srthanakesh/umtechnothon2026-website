const taskModel = require('../models/taskModel');

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.getAllTasks();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get task by ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskModel.getTaskById(id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: error.message });
  }
};

// Create a new task
const createTask = async (req, res) => {
  try {
    const { task_name, task_description } = req.body;
    
    if (!task_name) {
      return res.status(400).json({ error: 'Task name is required' });
    }
    
    // Using insertTask method instead of createTask to match your naming pattern
    const task = await taskModel.insertTask({
      task_name,
      task_description: task_description || ''
    });
    
    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask
};