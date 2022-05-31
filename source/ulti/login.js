
var cookieParser = require('cookie-parser')
const Users = require('../models/user')
const { mongooseToObject } = require('../ulti/mongoose')

//auth


const jwt = require('jsonwebtoken');
var secret = 'secretpasstoken'

function isLoggined(req, res, next) {
    console.log('isLoggined')
    try {
        var token = req.cookies.token;
        var decodeToken = jwt.verify(token, secret)
        Users.findOne({
            _id: decodeToken
        }).then(data => {
            if (data) {
                req.data = data
                if (data.countlogin === '0') {
                    return res.render('changePassword',
                     { username: data.username,
                        layout: 'nopartials' })
                }
                next()
            }
        }).catch(err => {
            console.log(err)
        })
    } catch (error) {
        console.log(error)
        return res.redirect('/login')
    }
}

// Check isAdmin
function isAdmin(req, res, next) {
    if (req.data.roles !== 'admin') {
        Users.findOne({ name: req.data.name })
        .then(user => {
            res.render('partials/error', {
                title: 'Error',
                layout: null,
                roleNofitication: 'This is Admin page.You are not allowed!',
            })

        })
    }
    next()
}

// Check Verify
function isVerify(req,res,next){
    if(req.data.permission !== 'Verified'){
        Users.findOne({name: req.data.name})
            .then (user =>{
            res.render('partials/error', {
                title: 'Error',
                layout: null,
                roleNofitication: 'Tính năng này chỉ dành cho các tài khoản đã được xác minh',
            })
        })
    }
    next()
}

module.exports = {isLoggined,isAdmin,isVerify}
