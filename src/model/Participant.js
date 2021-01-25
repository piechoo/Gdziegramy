const Sequelize = require("sequelize");
const db = require("./database");
const Event = require("../model/Event")
const User = require("../model/User")


const Participant = db.define('participants', {
    EventID: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        foreignKey: true
    },
    UserID: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        foreignKey: true
    }
},{

})
Participant.belongsTo(User, {foreignKey: 'UserID'});
Participant.belongsTo(Event, {foreignKey: 'EventID'});
module.exports = Participant;