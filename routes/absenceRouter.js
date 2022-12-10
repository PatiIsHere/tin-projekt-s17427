const express = require('express');
const router = express.Router();
const absenceController = require('../controllers/absenceController');


router.get('/', absenceController.showAbsenceList);
router.get('/deleted', absenceController.showAbsenceListAfterDel);
router.get('/updated', absenceController.showAbsenceListAfterUpd);
router.get('/added', absenceController.showAbsenceListAfterAdd);
router.get('/details/:IdAbsence', absenceController.showAbsenceDetails);

router.get('/add', absenceController.showAddAbsenceForm);
router.get('/edit/:IdAbsence', absenceController.showAbsenceEditForm);

router.post('/add', absenceController.addAbsence);
router.post('/edit', absenceController.updateAbsence);
router.get('/delete/:IdAbsence', absenceController.deleteAbsence);

module.exports = router;
