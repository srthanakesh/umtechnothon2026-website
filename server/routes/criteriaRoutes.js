const express = require('express');
const criteriaController = require('../controllers/criteriaController');

const router = express.Router();

router.get('/', criteriaController.getAllCriteria); 
router.get('/getAll', criteriaController.getAllCriteria);
router.get('/:id', criteriaController.getCriteriaById);
router.post('/', criteriaController.createCriteria);

module.exports = router;