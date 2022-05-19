const express = require("express");
const expressSession = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const exphbs = require('express-handlebars');
const route = require('./routes');
const helpers = require('handlebars-helpers')();
const db = require('./config/db');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
var cookieParser = require('cookie-parser')

const hbs = exphbs.create({  
  helpers:require('./ulti/helpers'),
  extname: '.hbs'
})

//--------- Server INITialization
const app = express();

//-----------------------------------
// Cấu hình thư viện + Data
//-----------------------------------
xPORT = process.env.PORT || 5000;


// Cấu hình MVC + Engine - View
app.engine('hbs', hbs.engine);
app.set("view engine", "hbs"); //setting view engine as handlebars
app.set("views", path.join(__dirname, 'resources/views'))


// khai báo tới thư mục Static / Public
// app.use(express.static('src/public')); dsadkjadsajdhl
app.use(express.static(path.join(__dirname, 'public')))

//Mongoose
// const User = require('../models/user')

//HTTP Loggers
app.use(morgan('combined'));

//Middleware to solve Body Form
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'));
app.use(bodyParser.json())


//PASSPORT REGISTER LOGIN
app.use(require("express-session")({
  secret: "keyboard cat",
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/user');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//-----------------------------------
// ROUTING tới các chức năng
//-----------------------------------
const Router = express.Router();

route(app);

app.listen(xPORT, () => {
  console.log(`http://localhost:${xPORT}`)
})