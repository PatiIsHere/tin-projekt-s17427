const Employee = require('../../model/sequelize/Employee')
const Absence = require('../../model/sequelize/Absence')
const Reason = require('../../model/sequelize/Reason')

exports.getEmployees = () => {
    return Employee.findAll();
}