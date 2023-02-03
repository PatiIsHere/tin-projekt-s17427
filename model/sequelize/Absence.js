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
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            }
        }
    },
    IdReason: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            }
        }
    },
    DateFrom: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            //isDate: true,
            isNotFromPast(value) {
                console.log(value)
                if (this.IdAbsence === null) {
                    const today = new Date();
                    const year = today.getFullYear();
                    const month = today.getMonth();
                    const day = today.getDate();
                    const mergeDate = new Date(year, month, day);

                    if (value < mergeDate) {
                        throw new Error('dateFromBeforeToday');
                    }
                    return true
                }

            }
        }
    },
    DateTo: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            //isDate: true,
            isAfterDateFrom(value) {
                if (value < this.DateFrom) {
                    throw new Error('dateToBeforeDateFrom');
                }
                return true
            }
        }
    },
    IsAccepted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            }
        }
    }
});

module.exports = Absence;