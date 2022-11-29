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
                //porownanie value < Date.now() porownuje jeszcze czas i milisekundy seta i checka na ustawieniu
                //dzisiejszej daty sie krzacza - musi byc literal
                if (value < Sequelize.literal('NOW() - INTERVAL \'7d\'')) {
                    throw new Error('Data od nie może być z przeszłości');
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
                    throw new Error('Data to nie może być wcześniej niż data od');
                }
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