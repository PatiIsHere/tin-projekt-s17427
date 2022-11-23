const Employee = require('../../model/sequelize/Employee')
const Absence = require('../../model/sequelize/Absence')
const Reason = require('../../model/sequelize/Reason')
const {Sequelize} = require("sequelize");

exports.getAbsences = () => {
    return Absence.findAll({
        include: [
            {
                model: Employee,
                as: 'employee'
            },
            {
                model: Reason,
                as: 'reason'
            }]
    });
}

exports.getAbsenceById = (absenceId) => {
    return Absence.findByPk(absenceId, {
        include: [
            {
                model: Employee,
                as: 'employee'
            },
            {
                model: Reason,
                as: 'reason'
            }]
    });
}

exports.createAbsence = (newAbsenceData) => {
    console.log(newAbsenceData);
    return Absence.create({
        IdEmployee: newAbsenceData.IdEmployee,
        IdReason: newAbsenceData.IdReason,
        DateFrom: newAbsenceData.DateFrom,
        DateTo: newAbsenceData.DateTo,
        IsAccepted: newAbsenceData.IsAccepted
    });
};

exports.updateAbsence = (absenceId, absenceData) => {
    return Absence.update(absenceData,
        {where: {IdAbsence: absenceId}});
};

exports.deleteAbsence = (absenceId) => {
    return Absence.destroy(
        {where: {IdAbsence: absenceId}});
};
//co to ma byc?
// exports.deleteManyAbsences = (absenceIds) => {
//     return Absence.find({ IdAbsence: { [Sequelize.Op.in]: absenceIds}})
// }