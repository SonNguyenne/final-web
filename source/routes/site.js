const express = require('express');
const router = express.Router();

const siteController = require('../controllers/siteController');

// Login all page
const {isLoggined,isAdmin,isVerify} = require('../ulti/login')
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


// Change Password after login
router.get('/resetPassword',isLoggined,siteController.resetPassword)
router.post('/resetPassword',isLoggined,siteController.resetPasswordSuccess)


// // FORGOT_PASSWORD
router.get('/forgotPassword',siteController.forgotPassword)
router.post('/forgotPassword',siteController.forgotPasswordSuccess)



//logout
router.post('/logout',siteController.logout)
router.use('/',isLoggined, siteController.index)




module.exports = router;