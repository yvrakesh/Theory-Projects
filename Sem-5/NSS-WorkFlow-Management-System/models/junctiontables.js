const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const StudentFarmwork = sequelize.define('studentfarmwork',{
    attendence: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    }
})
const StudentSocialwork = sequelize.define('studentsocialwork',{
    attendence: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    }
})

module.exports = {
    StudentFarmwork,
    StudentSocialwork
};