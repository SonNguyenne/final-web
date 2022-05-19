const express = require('express');
const router = express.Router();

const siteController = require('../controllers/siteController');

// Login all page
const {isLoggined} = require('../ulti/login')
var cookieParser = require('cookie-parser')
router.use(cookieParser())

//model
const Users = require('../models/user')


// /product/index - product.hbs

router.use('/register',siteController.register)
router.post('/registerSuccess',siteController.registerSuccess)

router.get('/login',siteController.login)
router.post('/login',siteController.validation)


router.post('/changePassword',siteController.changePasswordSuccess)
router.use('/changePassword',siteController.changePassword)

// // FORGOT_PASSWORD
// router.post('/forgotPassword',siteController.reqForgotPassword)
// router.use('/forgotPassword',siteController.forgotPassword)
// router.use('/OTP',siteController.oTP)


//logout
router.post('/logout',siteController.logout)
router.use('/', siteController.index)




module.exports = router;