const Users = require('../models/user')
const { multipleMongooseToObject } = require('../ulti/mongoose')
const { mongooseToObject } = require('../ulti/mongoose')
const { checkUserExist, makePassword, upload } = require('../ulti/register')

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

    detail(req, res, next) {
        var token = req.cookies.token;
        var decodeToken = jwt.verify(token, secret)
        Promise.all([Users.findOne({slug: req.params.slug}), Users.findOne({ _id: decodeToken })])
            .then(([userDetail, data]) => {
                if (data) {
                    req.data = data
                    // console.log(userDetail)
                    return res.render('customer/detail',
                        {
                            user: mongooseToObject(data),
                            userDetail: mongooseToObject(userDetail)
                        })
                 
                }
            }
            )
            .catch(next)
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
        Users.findOneAndUpdate({username: req.body.username}, {$inc: {money: req.body.money}, $push: {history: req.body}})
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



    withdraw(req, res, next) {
        var token = req.cookies.token;
        var decodeToken = jwt.verify(token, secret)
        Users.findOne({
            _id: decodeToken
        }).then(data => {
            if (data) {
                req.data = data
                console.log(data)
                return res.render('customer/withdraw',
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

    withdrawSuccess(req, res, next) {
        console.log('ok')
        Users.findOneAndUpdate({username: req.body.username}, {$inc: {money: req.body.money}, $push: {history: req.body}})
        .then(()=> {
            return res.render('customer/withdraw',{
                title: 'Charge Success',
                layout: 'main'
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



    edit(req, res, next) {
        upload(req, res, function (err) {
            var token = req.cookies.token;
            var decodeToken = jwt.verify(token, secret)
            console.log(decodeToken)
            console.log(token)
            Users.findOneAndUpdate({
                _id: decodeToken
            },{$set: { cmndfront: req.files.cmndfront[0].path.replace(/\\/g, "/").substr(14),
                         cmndback: req.files.cmndback[0].path.replace(/\\/g, "/").substr(14)
                }}).then(()=>{
                    return res.redirect('back')
                })

        })
       
    }
}

module.exports = new CustomerController;

const res = require('express/lib/response');
const customerController = require('./CustomerController');
