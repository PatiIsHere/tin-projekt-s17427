const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuth')

const absenceApiController = require('../../api/AbsenceAPI');

router.get('/', isAuth, absenceApiController.getAbsences);
router.get('/:IdAbsence', isAuth, absenceApiController.getAbsenceById);
router.post('/', isAuth, absenceApiController.createAbsence);
router.put('/:IdAbsence', isAuth, absenceApiController.updateAbsence);
router.delete('/:IdAbsence', isAuth, absenceApiController.deleteAbsence);

module.exports = router;