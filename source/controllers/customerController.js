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
                // console.log(data)
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
                // console.log(data)
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
            return res.redirect('back')

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
                // console.log(data)
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
        Users.findOne({username:req.body.username},(err,user)=>{
        if (err) {
            return console.log(err)
        }
        if (user.countWithdraw >= 2) {
            return res.json('1 ngày chỉ được rút tiền 2 lần')
        }else{
        var phantram = req.body.money*105/100
        Users.updateOne({username: req.body.username}, {$inc: {money: -phantram}, $push: {history: req.body}}, (err, status)=>{
            if(err){
                console.log(err)
            }
        })
        Users.updateOne({username: req.body.username}, {$set:{countWithdraw:user.countWithdraw +1}}, (err, status)=>{
            if(err){
                console.log(err)
            }
            return res.redirect('back')
        })
        var setWithdraw =setTimeout(function () {
            Users.updateOne({ username: req.body.username }, { $set: { countWithdraw: 0 } }, (err, status) => {
                if (err) {
                    console.log(err)
                }
            })
            console.log('reset counwithdraw')
        },86400000 );
        }
     })
    };




    history(req, res, next) {
        var token = req.cookies.token;
        var decodeToken = jwt.verify(token, secret)
        Promise.all([Users.find({ roles: 'user' }).sort({ "createdAt": -1 }), Users.findOne({ _id: decodeToken })])
            .then(([userList, data]) => {
                if (data) {
                    req.data = data
                    // console.log(userList)
                    return res.render('customer/history',
                        {
                            user: mongooseToObject(data),
                            userList: multipleMongooseToObject(userList),
                            layout: 'main'
                        })
                    }      
                }   
            )
        .catch(next)
    };



    edit(req, res, next) {
        upload(req, res, function (err) {
            var token = req.cookies.token;
            var decodeToken = jwt.verify(token, secret)
            // console.log(decodeToken)
            // console.log(token)
            Users.findOneAndUpdate({
                _id: decodeToken
            },{$set: { cmndfront: req.files.cmndfront[0].path.replace(/\\/g, "/").substr(14),
                         cmndback: req.files.cmndback[0].path.replace(/\\/g, "/").substr(14)
                }}).then(()=>{
                    return res.redirect('back')
                })

        })
       
    }

    buy(req, res, next) {
        var token = req.cookies.token;
        var decodeToken = jwt.verify(token, secret)
        Users.findOne({
            _id: decodeToken
        }).then(data => {
            if (data) {
                req.data = data
                // console.log(data)
                return res.render('customer/buy',
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

    buySuccess(req, res, next){
        var totalMoney = req.body.money
        var nhamang = req.body.nhamang
        Users.updateOne({username: req.body.username}, {$inc: {money: -totalMoney}, $push: {history: req.body}}, (err, status)=>{
        return res.render('customer/buy',
            {
                user: mongooseToObject(data),
                title: 'Banking',
                layout: 'main',
                mathe: req.body.cardnumber,
                nhamang: nhamang
            })
        })
    }
}

module.exports = new CustomerController;

const res = require('express/lib/response');
const customerController = require('./CustomerController');
