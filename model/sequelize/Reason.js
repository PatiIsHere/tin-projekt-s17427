const Sequelize = require('sequelize')
const sequelize = require('../../config/sequelize/sequelize')

const Reason = sequelize.define('Reason', {
    IdReason: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    SalaryPercentage: {
        type: Sequelize.DECIMAL(3, 2),
        allowNull: false
    }
});

module.exports = Reason;