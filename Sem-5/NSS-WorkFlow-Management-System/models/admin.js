const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Admin = sequelize.define('admin',{
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    FirstName : {
        type : Sequelize.STRING,
        allowNull : false
    },
    MiddleName : {
        type : Sequelize.STRING,
        allowNull : true
    },
    LastName : {
        type : Sequelize.STRING,
        allowNull : false
    },
    Email : {
        type : Sequelize.STRING,
        allowNull : true
    },
    Phone : {
        type : Sequelize.STRING,
        allowNull : true
    },
    Password : {
        type : Sequelize.STRING,
        allowNull : false
    },
});

module.exports = Admin;