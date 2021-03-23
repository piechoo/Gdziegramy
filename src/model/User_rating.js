const Sequelize = require("sequelize");
const db = require("./database");
const User = require("../model/User")

const User_rating = db.define('user_rating',{
    UserID: {
        type: Sequelize.INTEGER,
        primaryKey:true
    },
    rating:{
        type: Sequelize.TINYINT
    },
    judge:{
        type: Sequelize.INTEGER,
        primaryKey: true
    }

})
User_rating.hasMany(User, {foreignKey: 'UserID'});
module.exports = User_rating;