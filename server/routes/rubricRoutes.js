const express = require('express');
const rubricController = require('../controllers/rubricController');

const router = express.Router();

router.get('/', rubricController.getAllRubrics);
router.get('/:id', rubricController.getRubricById);
router.post('/', rubricController.createRubric);

module.exports = router;