const Employee = require('../../model/sequelize/Employee')
const Absence = require('../../model/sequelize/Absence')
const Reason = require('../../model/sequelize/Reason')

exports.getReasons = () => {
    return Reason.findAll();
}

exports.getReasonById = (reasonId) => {
    return Reason.findByPk(reasonId,
        {
            include: [{
                model: Absence,
                as: 'absences',
                include: [{
                    model: Employee,
                    as: 'employee'
                }]
            }]

        });
};

exports.createReason = (newReasonData) => {
    console.log(newReasonData);
    return Reason.create({
        Name: newReasonData.Name,
        SalaryPercentage: newReasonData.SalaryPercentage
    });
};

exports.updateReason = (reasonId, reasonData) => {
    const name = reasonData.Name;
    const salaryPercentage = reasonData.salaryPercentage;

    return Reason.update(reasonData,
        {where: {IdReason: reasonId}});
};

exports.deleteReason = (reasonId) => {
    return Reason.destroy({
        where: {IdReason: reasonId}
    });
};