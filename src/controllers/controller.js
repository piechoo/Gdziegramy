const db = require("../model/database")
const User = require("../model/User")
const Court = require("../model/Court")
const Adress = require("../model/Adress")
const Sport = require("../model/Sport")
const Event = require("../model/Event")

exports.renderHome = (request, response) => {
    if (request.session.loggedin) {
        response.render("home",{
            user: request.session.username
        })
    } else {
        response.render("home",{
            user: "Niezalogowany"
        })
    }
}

exports.renderLoginPage = (req, res) => {
    res.render("login")
}

exports.renderAddUser = (req, res) =>{
    res.render("adduser")
}

exports.renderAddCourt = (req, res) =>{
    res.render("addcourt")
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
        res.send('Please login to view this page!');
        res.end();
    }

}


exports.AddEvent = async (request, response) => {

    if (request.session.loggedin) {
        let name = request.body.name;
        let level = request.body.level;
        let start = request.body.starttime;
        let end = request.body.endtime;
        let court =  request.body.court;
        let user = await User.findOne({ where: { Name: request.session.username } });
        let sportid = await Court.findOne({ where: { CourtID: court } });

        Event.create({
            name: name,
            CourtID: court,
            startTime: start,
            endTime: end,
            level: level,
            UserID: user.UserID,
            SportID: sportid.SportID
        })
            .then( response.redirect("/home"))
            .catch(err => console.log(err))

        response.end();

    } else {
        response.send('Please login to view this page!');
    }
    response.end();

}

exports.AddUser = async (request, response) => {
    let username = request.body.username;
    let email = request.body.email;
    //let level = request.body.level;
    let password = request.body.password;

    //let {username, level, password, email} = data;

    User.create({
        Name: username,
        password: password,
        email: email
    })
        .then( response.redirect("/"))
        .catch(err => console.log(err))


    response.redirect('/home');
    response.send('Incorrect Username and/or Password!');
    response.end();

}

exports.AddCourt = async (request, response) => {
    let city = request.body.city;
    let street = request.body.street;
    let number = request.body.number;
    let sport = parseInt(request.body.sport);
    let point = { type: 'Point',
        coordinates: [request.body.cords1,request.body.cords2],
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
        .then( response.redirect("/courts"))
        .catch(err => console.log(err))

    response.end();

}


exports.LogIn = async (request, response) => {
    let username = request.body.username;
    let password = request.body.password;
    if (username && password) {
        let results = await User.findAll({
            attributes: ['Name'],
            where: {
                Name: username,
                password: password,
            }
        });

        if (results.length > 0) {
            request.session.loggedin = true;
            request.session.username = username;
            response.redirect('/home');
            response.end();
        } else {
            response.send('Incorrect Username and/or Password!');
        }
        response.end();
        }
    else {
        response.send('Please enter Username and Password!');
        response.end();
    }
}


exports.LogOut = async (request, response) => {
        if (request.session.loggedin) {
            request.session.loggedin = false;
            request.session.username = "";
            response.redirect('/');
            response.end();
        } else {
            response.redirect('/');
        }
        response.end();
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