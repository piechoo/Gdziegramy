const Op = require('sequelize').Op;
const User = require("../model/User")
const User_rating = require("../model/User_rating")
const Court = require("../model/Court")
const Adress = require("../model/Adress")
const Sport = require("../model/Sport")
const Event = require("../model/Event")
const Participant = require("../model/Participant")
const Level = require("../model/Level")
const {findMyParticipatedEvents} = require("./functions");
const {markEventUsers} = require("./functions");
const {findMyCreatedEvents} = require("./functions");
const {findParticipantsFromEvent} = require("./functions");
const {findEventByID} = require("./functions");
const {findActualEvents} = require("./functions");
const {calculateParticipantsLevels} = require("./functions");

exports.renderHome = (req, res) => {
    req.session.loggedin = true;
    req.session.username = 1;
    req.session.userid = 6;
    if (req.session.loggedin) {
        res.render("home",{
            user: req.session.username
        })
    } else {
        res.render("login",{
            error: "Musisz być zalogowany żeby zobaczyć tą stronę!"
        })
    }
}

exports.renderLoginPage = (req, res) => {
    res.render("login")
}

exports.renderFace = (req, res) => {
    res.render("index")
}

exports.renderAddUser = (req, res) =>{
    res.render("adduser")
}

exports.renderAddCourt = (req, res) =>{
    if (req.session.loggedin) {
        res.render("addcourt")
    }
    else {
        res.render("login",{
            error: "Musisz być zalogowany żeby zobaczyć tą stronę!"
        })
    }
}
exports.renderSearchCourt = (req, res) =>{
    if (req.session.loggedin) {
        res.render("searchcourt")
    }
    else {
        res.render("login",{
            error: "Musisz być zalogowany żeby zobaczyć tą stronę!"
        })
    }
}

exports.renderAddEvent = (req, res) =>{
    if (req.session.loggedin) {
        let courtlist;
        Court.findAll({
            include: [
                {
                    model: Adress,
                },
                {
                    model: Sport,
                }]
        }).then( result=>{
            courtlist = result
            res.render("addevent",{
                korty: courtlist
            })
        })
            .catch(err=>console.log(err));
    } else {
        res.render("login",{
            error: "Musisz być zalogowany żeby zobaczyć tą stronę!"
        })
    }

}


exports.AddEvent = async (req, res) => {

    if (req.session.loggedin) {
        let name = req.body.name;
        let level = req.body.level;
        let start = req.body.starttime;
        let end = req.body.endtime;
        let court =  req.body.court;
        let user = await User.findOne({ where: { Name: req.session.username } });
        let sportid = await Court.findOne({ where: { CourtID: court } });

        Event.create({
            name: name,
            CourtID: court,
            startTime: start,
            endTime: end,
            LevelID: level,
            UserID: user.UserID,
            SportID: sportid.SportID
        })
            .then( res.redirect("/home"))
            .catch(err => console.log(err))

        res.end();

    } else {
        res.render("login",{
            error: "Musisz być zalogowany żeby zobaczyć tą stronę!"
        })
    }
    res.end();
}

exports.AddEventFromMap = async (req, res) => {
    console.log(req.body)
    const {event, court, user} = req.body
    Event.create({
        name: event.name,
        CourtID: court.CourtID,
        startTime: event.start,
        endTime: event.end,
        LevelID: event.level,
        UserID: user,
        SportID: court.sport.SportID
    })
        .then( res.send("sukces"))
        .catch(err => console.log(err))

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
        .then( res.send(200))
        .catch(err => console.log(err))
    res.end();
}

exports.AddCourt = async (req, res) => {
    let city = req.body.city;
    let street = req.body.street;
    let number = req.body.number;
    let sport = parseInt(req.body.sport);
    let point = { type: 'Point',
        coordinates: [req.body.cords1,req.body.cords2],
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
        .then( res.redirect("/home"))
        .catch(err => console.log(err))

    res.end();

}
exports.searchCourt = (req, res) =>{
    let city = req.body.city
    let courttlist;
    Court.findAll({

        include: [
            {
                model: Sport,
            },
            {
                model: Adress,
                where: {
                    city:city,
                },
            }
            ]
    })
        .then( event=>{
            courtlist=event;
            res.render("showsearchcourts",{
                courts:courtlist
            })
        })
        .catch(err=>console.log(err));
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
            let data={
                isLogged : true,
                userID : results[0].UserID,
                username : username,
                error: ""
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


exports.LogOut = async (req, res) => {
        if (req.session.loggedin) {
            req.session.loggedin = false;
            req.session.username = "";
            res.redirect('/');
            res.end();
        } else {
            res.redirect('/');
        }
        res.end();
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


exports.getUsers = (req, res) =>{
    User.findAll()
        .then( users=>{
            console.log(users);
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

exports.showEvent = async (req, res) => {
    let eventlist = await findActualEvents()
    res.render("showevents", {
        events: eventlist
    })
}

exports.currentEvents = async (req, res) => {
    let eventlist = await findActualEvents()
    res.send(eventlist)
    res.end()
}

exports.ChooseEvent = async (req, res) => {
    let event = req.body.event;
    let user = req.session.username;

    let ev = await findEventByID(event)

    let parts = await findParticipantsFromEvent(event)
    let level = await calculateParticipantsLevels(parts)

    res.render("showparticipants",{
        event: ev,
        participants: parts,
        levels: level
    })

}



exports.becomeParticipant = async (req, res) => {
    let event = req.body.event;
    let usrID = req.body.userID;
    console.log(event)
    console.log(usrID)
    /*
    let user = req.session.username;
    let usr = await User.findOne({ where: { Name: user } });
     */
    let already = await Participant.findOne({ where: { EventID: event,UserID: usrID  } });
        if(already==null) {
            Participant.create({
                EventID: event,
                UserID: usr.UserID
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

exports.myEvents = async (req, res) => {
    let event = req.body.event;
    let user = req.session.username;
    let userid = req.session.userid;
    let events = await findMyParticipatedEvents(userid)

    res.render("showmyevents",{
        events: events
    })
}
exports.getMyEvents = async (req, res) => {
    let userid = req.body.userid;
    let events = await findMyParticipatedEvents(userid)

    res.send(events)
}


exports.getMyEventsParticipants = async (req, res) => {
    let event = req.body.event;
    //let user = req.session.username;


    let parts = await findParticipantsFromEvent(event)
    let level = await calculateParticipantsLevels(parts)
    res.send(
        {
            participants: parts,
            levels: level
        }
    )

}

exports.myEventsParticipants = async (req, res) => {
    let event = req.body.EventID;
    let user = req.session.username;
    let userid = req.session.userid;

    let ev = await findEventByID(event)
    let parts = await Participant.findAll({
        where: {
            EventID: event,
            UserID: { [Op.ne]: req.session.userid},
        },
        include:[
            {
                model: User,
            },
        ]
    })

    let userlevels = await calculateParticipantsLevels(parts)
    res.render("showmyparticipants",{
        event: ev,
        participants: parts,
        levels: userlevels
    })

}

exports.markEvents = async (req, res) => {
    let event = req.body;
    let user = req.session.username;
    let userid = req.session.userid;
    markEventUsers(event,userid)

    res.redirect("/showevent")
}


exports.createdEvents = async (req, res) => {
    let user = req.session.username;
    console.log(req.body)
    //let userid = req.session.userid;
    let userid = req.body.usrID
    let createdevents = await findMyCreatedEvents(userid)
    res.send({
        events: createdevents
    })
}

exports.createdEventsParticipants = async (req, res) => {
    console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSS")
    let event = req.body.EventID;
    let user = req.session.username;
    let userid = req.session.userid;

    let ev = await findEventByID(event)

    let parts = await Participant.findAll({
        where: {
            EventID: event,
            UserID: { [Op.ne]: req.session.userid},
        },
        include:[
            {
                model: User,
            },
        ]
    })
    let usersLevel = await calculateParticipantsLevels(parts)


    res.render("showcreatedparticipants",{
        event: ev,
        participants: parts,
        levels: usersLevel
    })

}

exports.kickPlayer = async (req, res) => {
    let player = req.body;
    let user = req.session.username;
    let userid = req.body.user;
    let event = req.body.event;
/*    let eventid;
    let deletedusr;
    for (var x in player) {
        eventid = x;
        deletedusr = player[x];

 */
        Participant.destroy({
            where: {
                EventID: event,
                UserID: userid
            }
        }).then(res.send({msg:"Usunięto zawodnika", error:false}))

}