const Users = require('../models/user')
const { multipleMongooseToObject } = require('../ulti/mongoose')
const { mongooseToObject } = require('../ulti/mongoose')

//jwt token direct all pages
const jwt = require('jsonwebtoken');
var secret = 'secretpasstoken'


class CustomerController {
    index(req, res, next) {
        var token = req.cookies.token;
        var decodeToken = jwt.verify(token, secret)
        Users.findOne({
            _id: decodeToken
        }).then(data => {
            if (data) {
                req.data = data
                console.log(data)
                return res.render('customer',
                    {
                        user: mongooseToObject(data)
                    })
                next()
            }
        }
        )
    };


    banking(req, res, next) {
        res.render('customer/banking', {
            title: 'Banking',
            layout: 'main',
        })
    };

    charge(req, res, next) {
        var token = req.cookies.token;
        var decodeToken = jwt.verify(token, secret)
        Users.findOne({
            _id: decodeToken
        }).then(data => {
            if (data) {
                req.data = data
                console.log(data)
                return res.render('customer/charge',
                    {
                        user: mongooseToObject(data),
                        title: 'Banking',
                        layout: 'main',
                    })
                next()
            }
        }
        )
    };

    chargeSuccess(req, res, next) {
        Users.findOneAndUpdate({username: req.body.username}, {$inc: {money: req.body.money}})
        .then(()=> {
            return res.render('customer/charge',{
                title: 'Charge Success',
                layout: 'main',
                chargeMsg: ' Nap tien thanh cong'
            })
        })
        .catch(err => {
            console.log(err)
        })
        
    };


    history(req, res, next) {
        res.render('customer/history', {
            title: 'History',
            layout: 'main',
        })
    };
}

module.exports = new CustomerController;

const res = require('express/lib/response');
const customerController = require('./CustomerController');
