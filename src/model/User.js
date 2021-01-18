const Sequelize = require("sequelize");
const db = require("./database");

const User = db.define('user',{
    UserID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name:{
        type: Sequelize.STRING
    },
    level:{
        type: Sequelize.TINYINT
    },
    password:{
        type: Sequelize.STRING
    },
    email:{
        type: Sequelize.STRING
    }

})

module.exports = User;