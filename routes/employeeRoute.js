const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const absenceController = require("../controllers/absenceController");


router.get('/', employeeController.showEmployeeList);

router.get('/deleted', employeeController.showEmployeeListAfterDel);
router.get('/updated', employeeController.showEmployeeListAfterUpd);
router.get('/added', employeeController.showEmployeeListAfterAdd);
router.get('/details/:IdEmployee', employeeController.showEmployeeDetails);

router.get('/add', employeeController.showAddEmployeeForm);
router.get('/edit/:IdEmployee', employeeController.showEmployeeEditForm);
//router.get('/delete/:IdEmployee', employeeController.showDeleteEmployeeForm);

router.post('/add', employeeController.addEmployee);
router.post('/edit', employeeController.updateEmployee);
router.get('/delete/:IdEmployee', employeeController.deleteEmployee);

module.exports = router;
