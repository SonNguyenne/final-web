const User = require('../models/user')
const { multipleMongooseToObject } = require('../ulti/mongoose')
const { mongooseToObject } = require('../ulti/mongoose')


class CustomerController {
    index(req, res, next) {
        res.render('customer', {
            title: 'Customer',
            layout: 'main',
        })
    };

    banking(req, res, next) {
        res.render('customer/banking', {
            title: 'Banking',
            layout: 'main',
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
