
var cookieParser = require('cookie-parser')
const Users = require('../models/user')
const { mongooseToObject } = require('../ulti/mongoose')

//auth


const jwt = require('jsonwebtoken');
var secret = 'secretpasstoken'

function isLoggined(req, res, next) {
    console.log('isLoggined')
    try {
        console.log(req.cookies)
        var token = req.cookies.token;
        var decodeToken = jwt.verify(token, secret)
        Users.findOne({
            _id: decodeToken
        }).then(data => {
            if (data) {
                req.data = data
                console.log(data)
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

module.exports = {isLoggined}
