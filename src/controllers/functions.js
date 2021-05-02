const User_rating = require("../model/User_rating")
const Sport = require("../model/Sport");
const Adress = require("../model/Adress");
const Court = require("../model/Court");
const Level = require("../model/Level");
const Event = require("../model/Event");
const User = require("../model/User");
const Participant = require("../model/Participant");
const {Op} = require("sequelize");

const lvlNames = (number)=>{
    switch (number){
        case 1:
            return "Początkujący"
            break;
        case 2:
            return "Amator"
            break;
        case 3:
            return "Średnio-zaawansowany"
            break;
        case 4:
            return "Zaawansowany"
            break;
        case 5:
            return "Profesjonalista"
            break;
        default:
            return "Początkujący"
    }
}


exports.calculateParticipantsLevels = async (parts) => {
    let users = [];
    let usersLevel = [];
    if (parts.length > 0) {
        for (i = 0; i < parts.length; i++) {
            users.push(parts[i].dataValues.UserID)
        }
        console.log(users)
        for (i = 0; i < users.length; i++) {
            let results = await User_rating.findAll({
                where: {
                    UserID: users[i],
                }
            });
            let ratings = 0;
            let counter = 0;
            if (results.length > 0) {
                for (j = 0; j < results.length; j++) {
                    ratings += results[j].dataValues.rating
                    counter++
                }
                usersLevel.push(Math.floor(ratings / counter))
            } else
                usersLevel.push(1)
            console.log(usersLevel)
        }
        console.log(parts)
    }
    return usersLevel
}

exports.calculateUserLevel = async (part) => {
    let user = part.UserID;
    let usersLevel = {
        level:1,
        name:"Początkujący"
    };
            let results = await User_rating.findAll({
                where: {
                    UserID: user,
                }
            });
            let ratings = 0;
            let counter = 0;
            if (results.length > 0) {
                for (j = 0; j < results.length; j++) {
                    ratings += results[j].dataValues.rating
                    counter++
                }
                usersLevel  = {
                    level: Math.floor(ratings / counter),
                    name: lvlNames(Math.floor(ratings / counter))
                }
            }

    return usersLevel
}

exports.findActualEvents = async ()=>{
    let events = await Event.findAll({
        where: {
            startTime: {
                [Op.gte]: new Date(),
            }
        },
        include: [
            {
                model: Sport,
            },
            {
                model: Court,

                include:[
                    {
                        model: Adress,
                    },
                ]
            },
            {
                model: Level,
            }]
    })
    return events
}

exports.findActualEventsFromCourt = async (courtid)=>{
    let events = await Event.findAll({
        where: {
            startTime: {
                [Op.gte]: new Date(),
            }
        },
        include: [
            {
                model: Sport,
            },
            {
                model: Court,
                where:{
                  CourtID:courtid,
                },
                include:[
                    {
                        model: Adress,
                    },
                ]
            },
            {
                model: Level,
            }]
    })
    return events
}

exports.findEventByID = async (eventId) =>{
    let ev = await Event.findOne({
        where: {
            EventID: eventId
        },
        include: [
            {
                model: Sport,
            },
            {
                model: Court,

                include:[
                    {
                        model: Adress,
                    },
                ]
            },
            {
                model: Level,
            }]
    })
    return ev
}

exports.findParticipantsFromEvent = async (eventId) =>{
    let parts = Participant.findAll({
        where: {
            EventID: eventId
        },
        include:[
            {
                model: User,
            },
        ]
    })
    return parts
}
exports.findMyCreatedEvents = async (userID)=>{
    let createdevents = await Event.findAll({ where: { UserID: userID  },include: [
            {
                model: Sport,
            },
            {
                model: Court,

                include:[
                    {
                        model: Adress,
                    },
                ]
            },
            {
                model: Level,
            }]
    });
    return createdevents
}
exports.findMyParticipatedEvents = async (userID) =>{
    let myevents = await Participant.findAll({ where: { UserID: userID  } });
    let ids = [];
    for (key in myevents) {
        ids.push(myevents[key].EventID);
    };
    let events = await Event.findAll({ where: { EventID: ids  },
        include: [
            {
                model: Sport,
            },
            {
                model: Court,

                include:[
                    {
                        model: Adress,
                    },
                ]
            },
            {
                model: Level,
            }]
    });
    return events
}

exports.markEventUsers = async (event, userID) =>{
    for (let x in event) {
        console.log(x + ': ' + event[x]);

        let results = await User_rating.findAll({
            where: {
                UserID: x,
                judge: userID,
            }
        });
        //check if user was already marked by logged user and update it
        if (results.length > 0) {
            await User_rating.update({
                rating: event[x]
            }, {
                where: {UserID: x,judge: userID,},

            })
        }
        else{
            User_rating.create({
                UserID: x,
                rating: event[x],
                judge: userID
            })
        }
    }
}

exports.doesEventCollide = async (start, end, court) =>{

    let colEvents1 = await Event.findAll({
        where: {
            startTime: {
                [Op.lte]: end,
            },
            endTime: {
                [Op.gte]: start,
            },
            CourtID: court,
        },
    })
    let colEvents2 = await Event.findAll({
        where: {
            startTime: {
                [Op.lte]: start,
            },
            endTime: {
                [Op.gte]: start,
            },
            CourtID: court,
        },
    })
    console.log(colEvents2.length)
    console.log(colEvents1.length)
    if(colEvents1.length<1 && colEvents2.length<1){
        console.log("siemz")
        return false
    }

    else
        return true
}


