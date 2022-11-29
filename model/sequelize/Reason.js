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
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 50],
                msg: "Pole powinno zawierać od 2 do 50 znaków"
            }
        }
    },
    SalaryPercentage: {
        type: Sequelize.DECIMAL(3, 2),
        allowNull: false,
        validate: {
            //not null tutaj nie działa
            // notNull: {
            //     msg: "Pole jest wymagane"
            // }
            isDecimal: {
                msg: "Pole jest wymagane"
            },
            isGraterThanZero(value) {
                if (value < 0) {
                    throw new Error("Zakres od 0.00 do 1.00")
                }
            },
            isLessThanOne(value) {
                if (value > 1) {
                    throw new Error("Zakres od 0.00 do 1.00")
                }
            }
        }
    }
});
//TODO
//by unique działał musi być sync -> dopytać się
//const sequelize = new Sequelize("sqlite::memory:");
// (async () => {
//     await sequelize.sync({force: true});
//     // Code here
// })();

module.exports = Reason;