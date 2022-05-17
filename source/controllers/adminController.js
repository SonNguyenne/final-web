const User = require('../models/user')
const { multipleMongooseToObject } = require('../ulti/mongoose')
const { mongooseToObject } = require('../ulti/mongoose')


class AdminController {
    index(req, res, next) {
  
        res.render('admin', {
            title: 'Admin',
            layout: 'adminLayout',
            usernameExample: 'username-example',
        })
    };

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
        res.render('admin/userManage', {
            title: 'User',
            layout: 'adminLayout',
        })
    };

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
