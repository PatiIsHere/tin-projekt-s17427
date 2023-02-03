const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuth')

const empApiController = require('../../api/EmployeeAPI');

router.get('/', isAuth, empApiController.getEmployees);
router.get('/:IdEmployee', isAuth, empApiController.getEmployeeById);
router.post('/', isAuth, empApiController.createEmployee);
router.put('/:IdEmployee', isAuth, empApiController.updateEmployee);
router.delete('/:IdEmployee', isAuth, empApiController.deleteEmployee);

module.exports = router;