const Sequelize = require("sequelize");
const db = require("./database");
const Level = require("../model/Level")

const User = db.define('user',{
    UserID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name:{
        type: Sequelize.STRING
    },
    LevelID:{
        type: Sequelize.TINYINT
    },
    password:{
        type: Sequelize.STRING
    },
    email:{
        type: Sequelize.STRING
    }

})
User.belongsTo(Level, {foreignKey: 'LevelID'});
module.exports = User;