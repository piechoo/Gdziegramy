const Sequelize = require("sequelize");
const db = require("./database");
const Sport = require("../model/Sport")
const Level = require("../model/Level")
const Court = require("../model/Court")
const Adress = require("../model/Adress")

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
    LevelID:{
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
Event.belongsTo(Level, {foreignKey: 'LevelID'});
Event.belongsTo(Court, {foreignKey: 'CourtID'});
Event.belongsTo(Adress, {foreignKey: 'CourtID'});
module.exports = Event;