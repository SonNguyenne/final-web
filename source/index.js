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

const hbs = exphbs.create({  
//   helpers:require('./ulti/helpers'),
  extname: '.hbs'
})

//--------- Server INITialization
const app = express();

//-----------------------------------
// Cấu hình thư viện + Data
//-----------------------------------
xPORT = process.env.PORT || 3000;


// Cấu hình MVC + Engine - View
app.engine('hbs', hbs.engine);
app.set("view engine", "hbs"); //setting view engine as handlebars
app.set("views", path.join(__dirname, 'resources/views'))


// khai báo tới thư mục Static / Public
// app.use(express.static('src/public')); dsadkjadsajdhl
app.use(express.static(path.join(__dirname, 'public')))

//HTTP Loggers
app.use(morgan('combined'));

//Middleware to solve Body Form
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'));
app.use(bodyParser.json())

//-----------------------------------
// ROUTING tới các chức năng
//-----------------------------------
const Router = express.Router();


route(app);

app.listen(xPORT, () => {
  console.log(`http://localhost:${xPORT}`)
})