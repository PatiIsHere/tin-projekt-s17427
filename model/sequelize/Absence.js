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
                msg: "Pole jest wymagane"
            }
        }
    },
    IdReason: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    },
    DateFrom: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isDate: true,
            isNotFromPast(value) {
                //validate only for new records
                if (this.IdAbsence === null) {
                    const today = new Date();
                    const year = today.getFullYear();
                    const month = today.getMonth();
                    const day = today.getDate();
                    const mergeDate = new Date(year, month, day);

                    if (value < mergeDate) {
                        throw new Error('`Data od` nie może być z przeszłości');
                    }
                }
            }
        }
    },
    DateTo: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isDate: true,
            isAfterDateFrom(value) {
                if (value < this.DateFrom) {
                    throw new Error('`Data do` nie może być wcześniej niż data od');
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
                msg: "Pole jest wymagane"
            }
        }
    }
});

module.exports = Absence;