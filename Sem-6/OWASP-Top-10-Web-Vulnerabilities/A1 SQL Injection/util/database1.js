const Sequelize = require('sequelize');

const sequelize = new Sequelize('injection','root','Security@15',{
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
});

module.exports = sequelize;