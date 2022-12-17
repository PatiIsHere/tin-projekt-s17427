const Sequelize = require('sequelize');

const sequelize = new Sequelize('tin-projekt-parulski-s17427', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;