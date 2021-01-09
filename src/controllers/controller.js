//const db = require("../index")
const db = require("../model/database")
const User = require("../model/User")
const Court = require("../model/Court")
const Adress = require("../model/Adress")


exports.renderLoginPage = (req, res) => {
    res.render("login")
}

exports.renderAddUser = (req, res) =>{
    res.render("adduser")
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

exports.getCourts = (req,res)=>{
    Court.findAll().then( result=>{
        res.send(result)
        res.end();})
        .catch(err=>console.log(err));
}

exports.renderHome = (request, response) => {
    if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.username + '!');
    } else {
        response.send('Please login to view this page!');
    }
    response.end();
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