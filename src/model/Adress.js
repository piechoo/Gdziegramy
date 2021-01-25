const Sequelize = require("sequelize");
const db = require("./database");
const Court = require("../model/Court")

const Adress = db.define('adresses', {
        AdressID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        number: {
            type: Sequelize.INTEGER
        },
        street: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        coordinates: {
            type: Sequelize.GEOMETRY('POINT', 4326)
        }
    },{

})

module.exports = Adress;