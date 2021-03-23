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
    password:{
        type: Sequelize.STRING
    },
    email:{
        type: Sequelize.STRING
    }

})
module.exports = User;