const express = require('express');
const router = express.Router();
const absenceController = require('../controllers/absenceController');


router.get('/', absenceController.showAbsenceList);
router.get('/details/:IdAbsence', absenceController.showAbsenceDetails);

router.get('/add', absenceController.showAddAbsenceForm);
router.get('/edit/:IdAbsence', absenceController.showAbsenceEditForm);
//router.get('/delete/:IdEmployee', employeeController.showDeleteEmployeeForm);

router.post('/add', absenceController.addAbsence);
router.post('/edit', absenceController.updateAbsence);
router.get('/delete/:IdAbsence', absenceController.deleteAbsence);

module.exports = router;
