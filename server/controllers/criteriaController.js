const criteriaModel = require('../models/criteriaModel');

// Get all criteria
const getAllCriteria = async (req, res) => {
  try {
    const { rubric_id } = req.query;
    
    let criteria;
    if (rubric_id) {
      criteria = await criteriaModel.getCriteriaByRubricId(rubric_id);
    } else {
      criteria = await criteriaModel.getAllCriteria();
    }
    
    res.json(criteria);
  } catch (error) {
    console.error('Error fetching criteria:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get criteria by ID
const getCriteriaById = async (req, res) => {
  const { id } = req.params;

  try {
    const criteria = await criteriaModel.getCriteriaById(id);

    if (!criteria) {
      return res.status(404).json({ error: "Criteria not found" });
    }

    return res.status(200).json(criteria);
  } catch (error) {
    console.error("Get Criteria Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new criteria
const createCriteria = async (req, res) => {
  try {
    const { 
      rubric_id, 
      criteria_name, 
      criteria_description, 
      max_points 
    } = req.body;
    
    if (!rubric_id || !criteria_name) {
      return res.status(400).json({ 
        error: 'Rubric ID and criteria name are required' 
      });
    }
    
    // Using insertCriteria to match the existing method
    const criteria = await criteriaModel.insertCriteria({
      rubric_id,
      criteria_name,
      criteria_description: criteria_description || '',
      max_points: max_points || 0
    });
    
    res.status(201).json({
      message: 'Criteria created successfully',
      criteria
    });
  } catch (error) {
    console.error('Error creating criteria:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCriteria,
  getCriteriaById,
  createCriteria
};