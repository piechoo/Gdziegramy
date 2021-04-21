const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const router = require("./router")
const db = require("./model/database")
const cors = require("cors");

db.authenticate()
    .then(()=>console.log('Database connected'))
    .catch(err=> console.log('Error: '+err))

const app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(cors())
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.set("views", "views")
app.set("view engine", "hbs")
app.use("/",router)
app.use(express.static(__dirname+'/public'));
console.log(__dirname+'/public')


app.listen('5000',()=>{
    console.log('Server started on port 5000')
})


module.exports = app;