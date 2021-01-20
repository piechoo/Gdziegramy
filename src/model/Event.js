const Sequelize = require("sequelize");
const db = require("./database");
const Sport = require("../model/Sport")

const Event = db.define('events',{
    EventID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: Sequelize.STRING
    },
    CourtID:{
        type: Sequelize.INTEGER,
        foreignKey: true
    },
    startTime:{
        type: Sequelize.DATE
    },
    endTime:{
        type: Sequelize.DATE
    },
    level:{
        type: Sequelize.TINYINT
    },
    UserID:{
        type: Sequelize.INTEGER,
        foreignKey: true
    },
    SportID:{
        type: Sequelize.INTEGER,
        foreignKey: true
    },
})

Event.belongsTo(Sport, {foreignKey: 'SportID'});
module.exports = Event;