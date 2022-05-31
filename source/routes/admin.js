const express = require('express')
const router = express.Router()

// Login all page
const { isLoggined,isAdmin,isVerify } = require('../ulti/login')
var cookieParser = require('cookie-parser')
router.use(cookieParser())



//model
const Users = require('../models/user')

const adminController = require('../controllers/adminController');

router.use('/error', adminController.error);

router.use('/wallet-manage', adminController.walletManage);

router.use('/user-manage',adminController.userManage)

router.use('/transaction-manage', adminController.transactionManage)

router.use('/withdraw-manage', adminController.withdrawManage)



//ban unban user
router.get('/ban/:id', adminController.ban)

router.get('/unBan/:id',adminController.unBan)


//verify user
router.get('/verify/:id', adminController.verify)

//cancle user
router.get('/cancle/:id', adminController.cancle)


router.use('/', isLoggined, isAdmin, adminController.index)




module.exports = router;