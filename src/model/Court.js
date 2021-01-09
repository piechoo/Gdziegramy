const Sequelize = require("sequelize");
const db = require("./database");

const Court = db.define('courts',{
    CourtID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    AdressID:{
        type: Sequelize.INTEGER,
        foreignKey: true
    },
    sport:{
        type: Sequelize.STRING
    }
})

module.exports = Court;