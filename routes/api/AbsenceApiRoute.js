const express = require('express');
const router = express.Router();

const absenceApiController = require('../../api/AbsenceAPI');

router.get('/', absenceApiController.getAbsences);
router.get('/:IdAbsence', absenceApiController.getAbsenceById);
router.post('/', absenceApiController.createAbsence);
router.put('/:IdAbsence', absenceApiController.updateAbsence);
router.delete('/:IdAbsence', absenceApiController.deleteAbsence);

module.exports = router;