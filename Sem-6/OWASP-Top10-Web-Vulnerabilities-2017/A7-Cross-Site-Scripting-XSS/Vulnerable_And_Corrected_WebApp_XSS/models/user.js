const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('user',{
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    UserName : {
        type : Sequelize.STRING,
        allowNull : false
    },
    Qualification:{
        type : Sequelize.STRING,
        allowNull : false
    },
    Password : {
        type : Sequelize.STRING,
        allowNull : false
    },
});

module.exports = User;