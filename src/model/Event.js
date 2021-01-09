const Sequelize = require("sequelize");
const db = require("./database");

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
    }
})

module.exports = Event;