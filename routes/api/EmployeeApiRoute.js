const express = require('express');
const router = express.Router();

const empApiController = require('../../api/EmployeeAPI');

router.get('/', empApiController.getEmployees);
router.get('/:IdEmployee', empApiController.getEmployeeById);
router.post('/', empApiController.createEmployee);
router.put('/:IdEmployee', empApiController.updateEmployee);
router.delete('/:IdEmployee', empApiController.deleteEmployee);

module.exports = router;