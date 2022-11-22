const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Absence = sequelize.define('Absence', {
    IdAbsence: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    IdEmployee: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    IdReason: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    DateFrom: {
        type: Sequelize.DATE,
        allowNull: false
    },
    DateTo: {
        type: Sequelize.DATE,
        allowNull: false
    },
    IsAccepted: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

module.exports = Absence;