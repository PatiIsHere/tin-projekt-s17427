const sequelize = require('./sequelize');

const Employee = require('../../model/sequelize/Employee');
const Reason = require('../../model/sequelize/Reason');
const Absence = require('../../model/sequelize/Absence');
const {Sequelize} = require("sequelize");

module.exports = () => {
    Employee.hasMany(Absence, {
        as: 'absences',
        foreignKey: {name: 'IdEmployee', allowNull: false},
        constraints: true,
        onDelete: 'CASCADE'
    });
    Absence.belongsTo(Employee, {as: 'employee', foreignKey: {name: 'IdEmployee', allowNull: false}});

    Reason.hasMany(Absence, {
        as: 'absences',
        foreignKey: {name: 'IdReason', allowNull: false},
        constraints: true,
        onDelete: 'CASCADE'
    });
    Absence.belongsTo(Reason, {as: 'reason', foreignKey: {name: 'IdReason', allowNull: false}});

    let allEmployees, allReasons;
    return sequelize
        .sync({force: true})
        .then(() => {
            return Employee.findAll();
        })
        .then(emps => {
            //TODO tutaj dwa == czy trzy ===?
            if (!emps || emps.length === 0) {
                return Employee.bulkCreate([
                    {Name: 'Jan', SecondName: 'Andrzej', Surname: 'Kowalski'},
                    {Name: 'Andrzej', SecondName: 'Jan', Surname: 'Niekowalski'},
                    {Name: 'Michał', SecondName: null, Surname: 'Testowy'},
                    {Name: 'Kazimierz', SecondName: null, Surname: 'Tetmajer'},
                    {Name: 'Janina', SecondName: 'Anna', Surname: 'Bąk'}
                ])
                    .then(() => {
                        return Employee.findAll();
                    });
            } else {
                return emps;
            }
        })
        .then(emps => {
            allEmployees = emps;
            return Reason.findAll();
        })
        .then(reasons => {
            if (!reasons || reasons.length === 0) {
                return Reason.bulkCreate([
                    {Name: 'Urlop', SalaryPercentage: 1.00},
                    {Name: 'Zwolnienie lekarskie', SalaryPercentage: 0.80}
                ])
                    .then(() => {
                        return Reason.findAll();
                    });
            } else {
                return reasons;
            }
        })
        .then(reasons => {
            allReasons = reasons;
            return Absence.findAll();
        })
        .then(absences => {
            if (!absences || absences.length === 0) {
                return Absence.bulkCreate([
                    {
                        IdEmployee: allEmployees[0].IdEmployee,
                        IdReason: allReasons[1].IdReason,
                        DateFrom: '2022-09-05',
                        DateTo: '2022-09-09',
                        IsAccepted: true
                    },
                    {
                        IdEmployee: allEmployees[0].IdEmployee,
                        IdReason: allReasons[0].IdReason,
                        DateFrom: '2022-10-10',
                        DateTo: '2022-10-14',
                        IsAccepted: true
                    },
                    {
                        IdEmployee: allEmployees[4].IdEmployee,
                        IdReason: allReasons[0].IdReason,
                        DateFrom: '2022-10-31',
                        DateTo: '2022-11-05',
                        IsAccepted: false
                    },
                    {
                        IdEmployee: allEmployees[2].IdEmployee,
                        IdReason: allReasons[0].IdReason,
                        DateFrom: '2022-10-31',
                        DateTo: '2022-11-05',
                        IsAccepted: false
                    }
                ])
            } else {
                return absences;
            }
        });
};