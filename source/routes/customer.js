const express = require('express');
const router = express.Router();

//login all pages
const { isLoggined,isAdmin,isVerify } = require('../ulti/login')
var cookieParser = require('cookie-parser')
router.use(cookieParser())



//model
const Users = require('../models/user')


const customerController = require('../controllers/customerController');

router.use('/banking', customerController.banking);

router.use('/history', customerController.history);

router.use('/charge', customerController.charge);

router.post('/charge-success', customerController.chargeSuccess);






// router.user('/customer', customerController.customer);

router.use('/',isLoggined,customerController.index)

module.exports = router;