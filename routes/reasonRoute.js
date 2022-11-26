const express = require('express');
const router = express.Router();
const reasonController = require('../controllers/reasonController');

router.get('/', reasonController.showReasonList);
router.get('/details/:IdReason', reasonController.showReasonDetails);

router.get('/add', reasonController.showAddReasonForm);
router.get('/edit/:IdReason', reasonController.showReasonEditForm);
//router.get('/delete/:IdEmployee', employeeController.showDeleteEmployeeForm);

router.post('/add', reasonController.addReason);
router.post('/edit', reasonController.updateReason);
router.get('/delete/:IdReason', reasonController.deleteReason);

module.exports = router;