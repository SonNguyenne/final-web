const Users = require('../models/user')
const { multipleMongooseToObject } = require('../ulti/mongoose')
const { mongooseToObject } = require('../ulti/mongoose')

//jwt token direct all pages
const jwt = require('jsonwebtoken');
var secret = 'secretpasstoken'

class AdminController {

    //[get:] Index
    index(req, res, next) {

        var token = req.cookies.token;
        var decodeToken = jwt.verify(token, secret)
        Users.findOne({
            _id: decodeToken
        }).then(data => {
            if (data) {
                req.data = data
                console.log(data)
                return res.render('admin',
                    {
                        user: mongooseToObject(data),
                        layout: 'adminLayout'
                    })
                next()
            }
        }
        )
    }

    //[get:] error

    error(req, res, next) {
        res.render('partials/error', {
            title: 'Error',
            layout: false,
        })
    };

    walletManage(req, res, next) {
        res.render('admin/walletManage', {
            title: 'Wallet',
            layout: 'adminLayout',
        })
    };


    userManage(req, res, next) {
        var token = req.cookies.token;
        var decodeToken = jwt.verify(token, secret)


        Promise.all([Users.find({ roles: 'user' }).sort({ "createdAt": -1 }), Users.findOne({ _id: decodeToken }),
        Users.find({ roles: 'user' }).sort({ "updatedAt": -1 })])
            .then(([userList, data, userListBanned]) => {
                if (data) {
                    req.data = data
                    // console.log(userList)
                    return res.render('admin/userManage',
                        {
                            user: mongooseToObject(data),
                            userList: multipleMongooseToObject(userList),
                            userListBanned: multipleMongooseToObject(userListBanned),

                            layout: 'adminLayout'
                        })

                }
            }
            )
            .catch(next)
    };


    ////// Manage Users
    ban(req, res, next) {
        Users.updateOne({ _id: req.params.id }, { $set: { banCheck: true, countFailed: 6 } })
            .then(() => {
                res.redirect('back')
            })
    }
    unBan(req, res, next) {
        Users.updateOne({ _id: req.params.id }, { $set: { banCheck: false, countFailed: 0 } })
            .then(() => {
                res.redirect('back')
            })
    }

    verify(req, res, next) {
        Users.updateOne({ _id: req.params.id }, { $set: { permission: "Verified" } })
            .then(() => {
                res.redirect('back')
            })
    }

    cancle(req, res, next) {
        Users.updateOne({ _id: req.params.id }, { $set: { banCheck: true, countFailed: 6 } })
            .then(() => {
                res.redirect('back')
            })
    }


    /////
    transactionManage(req, res, next) {
        var token = req.cookies.token;
        var decodeToken = jwt.verify(token, secret)
        Promise.all([Users.find({}), Users.findOne({ _id: decodeToken }), Users.findOne({ history: decodeToken})])
            .then(([userList, data]) => {
                if (data) {
                    req.data = data
                    // console.log(userList)
                    return res.render('admin/transactionManage',
                        {
                            user: mongooseToObject(data),
                            userList: multipleMongooseToObject(userList),
                            layout: 'adminLayout'
                        })
                    }      
                }   
            )
        .catch(next)
    };




    withdrawManage(req, res, next) {

        var token = req.cookies.token;
        var decodeToken = jwt.verify(token, secret)


        Promise.all([Users.find({ roles: 'user' }), Users.findOne({ _id: decodeToken }), Users.findOne({ history: decodeToken})])
            .then(([userList, data]) => {
                if (data) {
                    req.data = data
                    // console.log(userList)
                    return res.render('admin/withdrawManage',
                        {
                            user: mongooseToObject(data),
                            userList: multipleMongooseToObject(userList),
                            layout: 'adminLayout'
                        })
                    }      
                }   
            )
        .catch(next)
    };
}

module.exports = new AdminController;

const res = require('express/lib/response');
const adminController = require('./AdminController');
