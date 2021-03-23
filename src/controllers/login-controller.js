const db = require("../model/database")
const User = require("../model/User")
const Court = require("../model/Court")
const Adress = require("../model/Adress")
const Sport = require("../model/Sport")
const Event = require("../model/Event")
const Participant = require("../model/Participant")
const Level = require("../model/Level")

exports.renderHome = (req, res) => {
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

exports.AddUser = async (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    //let level = req.body.level;
    let password = req.body.password;

    //let {username, level, password, email} = data;
    let usr = await User.findOne({ where: { Name: username, email:email } });
    if(usr!=null)
    {
        res.render("login",{
            error: "Istnieje już użytkownik o takich danych!"
        })
    }
    else {
        User.create({
            Name: username,
            password: password,
            email: email
        })
            .then(res.redirect("/login"))
            .catch(err => console.log(err))
    }
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
        .then( res.redirect("/courts"))
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
            res.send(courtlist)
        })
        .catch(err=>console.log(err));
}

exports.LogIn = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
        let results = await User.findAll({
            attributes: ['Name'],
            where: {
                Name: username,
                password: password,
            }
        });

        if (results.length > 0) {
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/home');
            res.end();
        } else {
            res.render("login",{
                error: "Niepoprawny login lub hasło!"
            })
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
    Court.findAll().then( result=>{
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

exports.showEvent = (req, res) =>{
    let eventlist;
    Event.findAll({
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
        .then( event=>{
            eventlist=event;
            res.render("showevents",{
                events: eventlist
            })
        })
        .catch(err=>console.log(err));
}

exports.ChooseEvent = async (req, res) => {
    let event = req.body.event;
    let user = req.session.username;
    console.log(event)

    let ev = await Event.findOne({
        where: {
            EventID: event
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
    Participant.findAll({
        where: {
            EventID: event
        },
        include:[
            {
                model: User,
                include:[
                    {
                        model: Level,
                    },
                ]
            },
        ]
    })
        .then(parts=>{
            res.render("showparticipants",{
                event: ev,
                participants: parts,
            })
            console.log(JSON.stringify(parts))
        })
        .catch(err=>console.log(err));

}

exports.becomeParticipant = async (req, res) => {
    let event = req.body.event;
    let user = req.session.username;
    let usr = await User.findOne({ where: { Name: user } });
    let already = await Participant.findOne({ where: { EventID: event,UserID: usr.UserID  } });
        if(already==null) {
            Participant.create({
                EventID: event,
                UserID: usr.UserID
            })
                .then(adress => {
                    res.render("home",{
                        error: 'Zapisano na wydarzenie!',
                        user: user
                    })
                })
                .catch(err => console.log(err))
        }
        else {
            res.render("home",{
                error: 'Jesteś już zapisany na to wydarzenie!',
                user: user
            })
        }

}
