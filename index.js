const express = require('express')
const mysql = require('mysql')
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'nodeuser',
    password: 'node',
    database: 'gdziegramy'
});

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('MySql connected...')
})

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/auth', function(request, response) {
    let username = request.body.username;
    let password = request.body.password;
    if (username && password) {
        db.query('SELECT * FROM users WHERE Name = ? AND password = ?', [username, password], (error, result, fields) => {
            if (result.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/home');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});



app.get('/getcourts', (req,res)=>{
    let sql = 'SELECT * FROM courts'
    db.query(sql,(err,result)=>{
        if(err) throw err;

        res.send(result)
        res.end();
    })
})

app.get('/home', function(request, response) {
    if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.username + '!');
    } else {
        response.send('Please login to view this page!');
    }
    response.end();
});

app.listen('3000',()=>{
    console.log('Server started on port 3000')
})