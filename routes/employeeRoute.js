const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');


router.get('/', employeeController.showEmployeeList);
router.get('/add', employeeController.showAddEmployeeForm);
router.get('/details/:IdEmployee', employeeController.showEmployeeDetails);
// router.get('/delete/:IdEmployee', employeeController.showDeleteEmployeeForm);

module.exports = router;