const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Group = sequelize.define('group',{
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
   status: {
        type : Sequelize.STRING,
        allowNull : true
   }
});

const Splprojectgrp = sequelize.define("splprojectgrp",{
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    projectName: {
        type : Sequelize.STRING,
        allowNull : false
    },
    SampleDescription:{
        type: Sequelize.STRING,
        allowNull: true
    },
    FullDescription:{
        type: Sequelize.STRING,
        allowNull: true
    },
    Feedback:{
        type: Sequelize.STRING,
        allowNull: true
    },
    Samplefeedback:{
        type: Sequelize.STRING,
        allowNull: true
    }
});

const Activity = sequelize.define('activity',{
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Hours:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Date:{
        type: Sequelize.DATE,
        allowNull: false
    },
    Location: {
        type : Sequelize.STRING,
        allowNull : false
    }
});

const Farmwork = sequelize.define("farmwork",{
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Feedback:{
        type: Sequelize.STRING,
        allowNull: true
    },
    Proof: {
        type : Sequelize.STRING,
        allowNull: true
    }
});

const Socialwork = sequelize.define("socialwork",{
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Feedback:{
        type: Sequelize.STRING,
        allowNull: true
    },
    Proof: {
        type : Sequelize.STRING,
        allowNull: true
    }
});


module.exports = {
    Group,
    Activity,
    Farmwork,
    Socialwork,
    Splprojectgrp
};