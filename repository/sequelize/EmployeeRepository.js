const Employee = require('../../model/sequelize/Employee')
const Absence = require('../../model/sequelize/Absence')
const Reason = require('../../model/sequelize/Reason')

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

exports.createEmployee = (newEmpData) => {
    console.log(newEmpData);
    return Employee.create({
        Name: newEmpData.Name,
        SecondName: newEmpData.SecondName,
        Surname: newEmpData.Surname,
        Email: newEmpData.Email
    });
};

exports.updateEmployee = (empId, empData) => {
    const name = empData.Name;
    const secondName = empData.SecondName;
    const surName = empData.Surname;

    return Employee.update(empData,
        {where: {IdEmployee: empId}});
};

exports.deleteEmployee = (empId) => {
    return Employee.destroy({
        where: {IdEmployee: empId}
    });
};