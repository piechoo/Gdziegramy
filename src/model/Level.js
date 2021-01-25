const Sequelize = require("sequelize");
const db = require("./database");


const Level = db.define('levels', {
    LevelID: {
        type: Sequelize.TINYINT,
        primaryKey: true
    },
    levelName: {
        type: Sequelize.STRING
    }
},{

})

module.exports = Level;