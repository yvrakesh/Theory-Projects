const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const People = sequelize.define('people',{
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
    Department : {
        type : Sequelize.STRING,
        allowNull : false
    },
});

const Faculty =  sequelize.define('faculty',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

const Student =  sequelize.define('student',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    SplProjectHours:{
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    FarmWorkHours:{
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    SocialWorkHours:{
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    Grades : {
        type: Sequelize.STRING,
        defaultValue: "NOT GRADED"
    }
});

const Nssvolunteer =  sequelize.define('nssvolunteer',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

const Farmhead =  sequelize.define('farmhead',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

const Socialhead =  sequelize.define('socialhead',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

const Splvolunteer =  sequelize.define('splvolunteer',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});



module.exports = {
    People,
    Faculty,
    Student,
    Nssvolunteer,
    Farmhead,
    Socialhead,
    Splvolunteer
};
