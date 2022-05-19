const Users = require('../models/user')
const { multipleMongooseToObject } = require('../ulti/mongoose')
const { mongooseToObject } = require('../ulti/mongoose')
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

            // res.render('admin', {
            //     title: 'Admin',
            //     layout: 'adminLayout',
            //     usernameExample: 'username-example',
            // })
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


        Promise.all([Users.find({}), Users.findOne({ _id: decodeToken })])
            .then(([userList, data]) => {
                if (data) {
                    req.data = data
                    // console.log(userList)
                    return res.render('admin/userManage',
                        {
                            data: mongooseToObject(data),
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


    ban(req, res, next) {
        
        // var token = req.cookies.token;
        // var decodeToken = jwt.verify(token, secret)
        // Promise.all([Users.find({}), Users.findOne({ _id: decodeToken }),   Users.updateOne({_id: req.params.id},{$set: {banCheck: true}})])
        //     .then(([userList, data, ban]) => {
        //         if (data) {
        //             req.data = data
        //             // console.log(userList)
        //             return res.render('admin/userManage',
        //                 {
        //                     data: mongooseToObject(data),
        //                     userList: multipleMongooseToObject(userList),
        //                     layout: 'adminLayout'
        //                 })
                 
        //         }
        //     }
        //     )
        //     .catch(next)

        Users.updateOne({_id: req.params.id},{$set: {banCheck: true}})
        .then(()=> {
            res.redirect('back')
        })
    }

    unBan(req, res, next) {
       

        Users.updateOne({_id: req.params.id},{$set: {banCheck: false}})
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
