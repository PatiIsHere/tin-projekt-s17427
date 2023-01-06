const Employee = require('../../model/sequelize/Employee')
const Absence = require('../../model/sequelize/Absence')
const Reason = require('../../model/sequelize/Reason')
const authUtils = require('../../util/authUtils')
const {getEmployeeById} = require("../../api/EmployeeAPI");

exports.getEmployees = () => {
    return Employee.findAll();
}

exports.getEmployeeById = (empId) => {
    return Employee.findByPk(empId,
        {
            include: [{
                model: Absence,
                as: 'absences',
                include: [{
                    model: Reason,
                    as: 'reason'
                }]
            }]

        });
};

exports.findByEmail = (email) => {
    return Employee.findOne({
        where: {Email: email}
    })
}

exports.createEmployee = (newEmpData) => {
    console.log(newEmpData);
    return Employee.create({
        Name: newEmpData.Name,
        SecondName: newEmpData.SecondName,
        Surname: newEmpData.Surname,
        Email: newEmpData.Email,
        Password: newEmpData.Password != '' ? authUtils.hashPassword(newEmpData.Password) : newEmpData.Password
    });
};

exports.updateEmployee = (empId, empData) => {
    const name = empData.Name;
    const secondName = empData.SecondName;
    const surName = empData.Surname;
    // if (empData.Password != '') {
    //     empData.Password = authUtils.hashPassword(empData.Password)
    // }
    return Employee.update(empData,
        {where: {IdEmployee: empId}});
};

exports.deleteEmployee = (empId) => {
    return Employee.destroy({
        where: {IdEmployee: empId}
    });
};