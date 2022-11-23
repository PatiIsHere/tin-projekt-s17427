const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Employee = sequelize.define('Employee', {
    IdEmployee: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    SecondName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    Surname: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Employee;