const express = require('express');
const router = express.Router();
const absenceController = require('../controllers/absenceController');

router.get('/', absenceController.showAbsenceList);
router.get('/add', absenceController.showAddAbsenceForm);
router.get('/details/:absenceId', absenceController.showAbsenceDetails);
module.exports = router;