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
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [2, 50],
                msg: "len_2_50"
            }
        }
    },
    SecondName: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            isNullOrInRange(value) {
                if (value !== '') {
                    if (value.length > 50 || value.length < 2) {
                        throw new Error("len_2_50")
                    }
                }
            }
        }
    },
    Surname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [2, 100],
                msg: "len_2_100"
            }
        }
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [6, 100],
                msg: "len_6_100"
            },
            isEmail: {
                msg: 'isEmail'
            }
        }
    },
    Password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            }
        }
    },
    IsAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            }
        }
    }

})

module.exports = Employee;