const Sequelize = require('sequelize');

const sequelize = new Sequelize('g18dbms','root','b180440cs',{
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
});

module.exports = sequelize;   