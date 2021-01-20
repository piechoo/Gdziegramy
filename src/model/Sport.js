const Sequelize = require("sequelize");
const db = require("./database");


const Sport = db.define('sports', {
    SportID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    }
},{

})

module.exports = Sport;