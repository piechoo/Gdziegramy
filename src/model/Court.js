const Sequelize = require("sequelize");
const db = require("./database");
const Adress = require("../model/Adress")
const Sport = require("../model/Sport")

const Court = db.define('courts',{
    CourtID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    AdressID:{
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: { model: 'Adress', key: 'AdressID' },
        onDelete: 'CASCADE',
    },
    SportID:{
        type: Sequelize.INTEGER,
        foreignKey: true
    },
})
Court.belongsTo(Adress, {foreignKey: 'AdressID'});
Court.belongsTo(Sport, {foreignKey: 'SportID'});
module.exports = Court;