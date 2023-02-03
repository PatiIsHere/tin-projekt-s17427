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
        //z dokumentacji: https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#unique-constraint
        //mógłbym tutaj dodać unique
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
    SalaryPercentage: {
        type: Sequelize.DECIMAL(3, 2),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            isDecimal: {
                msg: "notEmpty"
            },
            isGraterThanZero(value) {
                if (value < 0) {
                    throw new Error("between_0_1")
                }
            },
            isLessThanOne(value) {
                if (value > 1) {
                    throw new Error("between_0_1")
                }
            }
        }
    }
});
module.exports = Reason;