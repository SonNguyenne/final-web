const express = require('express')
const router = express.Router()

// Login all page
const {isLoggined} = require('../ulti/login')
var cookieParser = require('cookie-parser')
router.use(cookieParser())

//model
const Users = require('../models/user')

const adminController = require('../controllers/adminController');

router.use('/error', adminController.error);

router.use('/wallet-manage', adminController.walletManage);

router.use('/user-manage', adminController.userManage)

router.use('/transaction-manage', adminController.transactionManage)

router.use('/', isLoggined,adminController.index)




module.exports = router;