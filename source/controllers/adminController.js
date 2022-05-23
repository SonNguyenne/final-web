const Users = require('../models/user')
const { multipleMongooseToObject } = require('../ulti/mongoose')
const { mongooseToObject } = require('../ulti/mongoose')

//jwt token direct all pages
const jwt = require('jsonwebtoken');
var secret = 'secretpasstoken'

class AdminController {

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


        Promise.all([Users.find({roles: 'user'}), Users.findOne({ _id: decodeToken })])
            .then(([userList, data]) => {
                if (data) {
                    req.data = data
                    // console.log(userList)
                    return res.render('admin/userManage',
                        {
                            user: mongooseToObject(data),
                            userList: multipleMongooseToObject(userList),
                            layout: 'adminLayout'
                        })
                 
                }
            }
            )
            .catch(next)


        //         Users.findOne({
        //             _id: decodeToken
        //         }).then(data => {
        //             if (data) {
        //                 req.data = data
        //                 console.log(data)
        //                     return res.render('admin/userManage',
        //                      {  user: mongooseToObject(data),
        //                         layout: 'adminLayout' })
        //                 next()
        //             }

        //        // res.render('admin/userManage', {
        //         //     title: 'User',
        //         //     layout: 'adminLayout',
        //         // })
        //     }
        // )

    };


//////
    ban(req, res, next) {
        Users.updateOne({_id: req.params.id},{$set: {banCheck: true, countFailed: 6}})
        .then(()=> {
            res.redirect('back')
        })
    }
    unBan(req, res, next) {
        Users.updateOne({_id: req.params.id},{$set: {banCheck: false, countFailed: 0}})
        .then(()=> {
            res.redirect('back')
        })
    }

    verify(req, res, next) {
        Users.updateOne({_id: req.params.id},{$set: {permission: "Verified"}})
        .then(()=> {
            res.redirect('back')
        })
    }


    transactionManage(req, res, next) {
        res.render('admin/transactionManage', {
            title: 'Transaction',
            layout: 'adminLayout',
        })
    };
}

module.exports = new AdminController;

const res = require('express/lib/response');
const adminController = require('./AdminController');
