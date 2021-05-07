const Op = require('sequelize').Op;
const User = require("../model/User")
const User_rating = require("../model/User_rating")
const Court = require("../model/Court")
const Adress = require("../model/Adress")
const Sport = require("../model/Sport")
const Event = require("../model/Event")
const Participant = require("../model/Participant")
const Level = require("../model/Level")
const {findActualSportEvents} = require("./functions");
const {findMyParticipatedEvents} = require("./functions");
const {markEventUsers} = require("./functions");
const {markUsers} = require("./functions");
const {findMyCreatedEvents} = require("./functions");
const {findParticipantsFromEvent} = require("./functions");
const {findEventByID} = require("./functions");
const {findActualEvents} = require("./functions");
const {calculateParticipantsLevels} = require("./functions");
const {calculateUserLevel} = require("./functions");
const {findActualEventsFromCourt} = require("./functions");
const {doesEventCollide} = require("./functions");


exports.AddEventFromMap = async (req, res) => {
    const {event, court, user} = req.body
    const isColliding = await doesEventCollide(event.start,event.end,court.CourtID)
    if(isColliding){
        res.send({
            msg: 'W tym terminie nie można utworzyć wydarzenia!',
            error: true
        })
    }
    else {
        Event.create({
            name: event.name,
            CourtID: court.CourtID,
            startTime: event.start,
            endTime: event.end,
            LevelID: event.level,
            UserID: user,
            SportID: court.sport.SportID
        })
            .then(res.send({
                msg: 'Dodano wydarzenie!',
                error: false
            }))
            .catch(err => console.log(err))
    }
    res.end();
}



exports.AddUser = async (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    if (!(username && email && password)) {
        let data={
            isLogged : false,
            userID : '',
            username : '',
            error: "Brakuje wymaganych danych !"
        }
        res.send(data)
        res.end
    }
    //let {username, level, password, email} = data;
    let usr = await User.findOne({ where: { Name: username } });
    let usrEmail = await User.findOne({ where: {  email:email } });
    if(usr!=null || usrEmail!=null)
    {
        let data={
            isLogged : false,
            userID : '',
            username : '',
            error: "Istnieje już użytkownik o podanych danych !"
        }
        res.send(data)
        res.end
    }
    else{
        User.create({
            Name: username,
            password: password,
            email: email
        })
            .then(res.send({success:true}))
            .catch(err => console.log(err))
        res.end
    }
}



exports.AddCourtFromMap = async (req, res) => {
    let city = req.body.city;
    let street = req.body.street;
    let number;
    if(req.body.number)
        number = parseInt(req.body.number);
    else
        number=0
    let sport = req.body.sport;
    let point = { type: 'Point',
        coordinates: [req.body.cords[0],req.body.cords[1]],
        crs: { type: 'name', properties: { name: 'EPSG:4326'}}
    };

    Adress.create({
        number: number,
        street: street,
        city: city,
        coordinates: point
    })
        .then( result => {
            Court.create({
                AdressID: result.AdressID,
                SportID: sport
            })
                .catch(err => console.log(err))
        })
        .then( res.send({
            msg: 'Dodano wydarzenie!',
            error: false
        }))
        .catch(err => console.log(err))
    res.end();
}


exports.LogIn = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
        let results = await User.findAll({
            where: {
                Name: username,
                password: password,
            }
        });
        if (results.length > 0) {
            let usersLevel = await calculateUserLevel(results[0])
            console.log(usersLevel)
            let data={
                isLogged : true,
                userID : results[0].UserID,
                username : username,
                error: "",
                level:usersLevel,
            }

            res.send(data)
            res.end
        } else {
            let data={
                isLogged : false,
                userID : '',
                username : '',
                error: "Niepoprawny login lub hasło!"
            }
            res.send(data)
            res.end
        }
        }
    else {
        res.render("login",{
            error: "Podaj login i hasło!"
        })
    }
}


exports.getCourts = (req,res)=>{
    Court.findAll({
        include:[
            {
                model: Adress
            },
            {
                model: Sport
            }
        ]
    }).then( result=>{
        res.send(result)
        res.end();})
        .catch(err=>console.log(err));
}

exports.getSportCourts = (req,res)=>{
    const sport = req.body.sport;
    Court.findAll({
        include:[
            {
                model: Adress
            },
            {
                model: Sport,
                where:{
                    SportID:sport,
                },
            }
        ]
    }).then( result=>{
        res.send(result)
        res.end();})
        .catch(err=>console.log(err));
}


exports.getUsers = (req, res) =>{
    User.findAll()
        .then( users=>{
            res.send(users);
        })
        .catch(err=>console.log(err));
}

exports.getAdress = (req, res) =>{
    Adress.findAll()
        .then( adress=>{
            res.send(adress);
        })
        .catch(err=>console.log(err));
}

exports.currentEvents = async (req, res) => {
    let eventlist = await findActualEvents()
    res.send(eventlist)
    res.end()
}

exports.currentSportEvents = async (req, res) => {
    let eventlist = await findActualSportEvents(req.body.sport)
    res.send(eventlist)
    res.end()
}

exports.becomeParticipant = async (req, res) => {
    let event = req.body.event;
    let usrID = req.body.userID;
    let already = await Participant.findOne({ where: { EventID: event,UserID: usrID  } });
        if(already==null) {
            Participant.create({
                EventID: event,
                UserID: usrID
            })
                .then(adress => {
                    res.send({
                        msg: 'Zapisano na wydarzenie!',
                        error: false
                    })
                })
                .catch(err => console.log(err))
        }
        else {
            res.send({
                msg: 'Jesteś już zapisany na to wydarzenie!',
                error: true
            })
        }

}

exports.getMyEvents = async (req, res) => {
    let userid = req.body.userid;
    let events = await findMyParticipatedEvents(userid)
    res.send(events)
}


exports.getMyEventsParticipants = async (req, res) => {
    let event = req.body.event;
    let userid = req.body.userid;

    let parts = await findParticipantsFromEvent(event,userid)
    let level = await calculateParticipantsLevels(parts)
    res.send(
        {
            participants: parts,
            levels: level
        }
    )

}


exports.markParticipants = async (req, res) => {
    let marks = req.body.marks;
    let userid = req.body.userid;
    markUsers(marks,userid)
    res.send({msg:"Dodano oceny !", error:false})
}


exports.createdEvents = async (req, res) => {
    let userid = req.body.usrID
    let createdevents = await findMyCreatedEvents(userid)
    res.send({
        events: createdevents
    })
}


exports.kickPlayer = async (req, res) => {
    let userid = req.body.user;
    let event = req.body.event;
        Participant.destroy({
            where: {
                EventID: event,
                UserID: userid
            }
        }).then(res.send({msg:"Usunięto zawodnika", error:false})).catch(res.send({error:true, msg:"Coś poszło nie tak"}))

}

exports.destroyAccount = async (req, res) => {
    let user = req.body.username;
    let userid = req.body.userid;
    User.destroy({
        where: {
            Name: user,
            UserID: userid
        }
    }).then(res.send({success:true})).catch(res.send({success:false, error:"Coś poszło nie tak"}))
}

exports.isPasswordCorrect = async (req, res) => {
    let userid = req.body.userid;
    let password = req.body.password;
    let found = await User.findOne({
        where: {
            password: password,
            UserID: userid
        }
    })
    if(found)
    res.send({success:true})
    else
    res.send({success:false, error:"Podano złe dane !"})
}
exports.changePassword = async (req, res) => {
    let userid = req.body.userid;
    let password = req.body.password;
    let found = await User.update({
        password: password
    }, {
        where: {UserID: userid},
    })
    if(found)
        res.send({success:true})
    else
        res.send({success:false, error:"Coś poszło nie tak !"})
}
exports.changeEmail = async (req, res) => {
    let userid = req.body.userid;
    let email = req.body.email;
    let found = await User.update({
        email: email
    }, {
        where: {UserID: userid},
    })
    if(found)
        res.send({success:true})
    else
        res.send({success:false, error:"Coś poszło nie tak !"})
}

exports.getEventsFromCourt = async (req, res) => {
    console.log(req.body)
    const {courtid} = req.body
    let eventlist = await findActualEventsFromCourt(courtid)
    res.send(eventlist)
    res.end()

    res.end();
}
