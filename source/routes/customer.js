const express = require('express');
const router = express.Router();

//login all pages
const { isLoggined,isAdmin,isVerify } = require('../ulti/login')
var cookieParser = require('cookie-parser')
router.use(cookieParser())



//model
const Users = require('../models/user')


const customerController = require('../controllers/customerController');

router.use('/transfer', customerController.transfer);
router.use('/transfer-success', customerController.transferSuccess);

router.use('/history', customerController.history);
router.use('/history-detail/:id', customerController.historyDetails);

// nap tien

router.use('/charge', customerController.charge);

router.post('/charge-success', customerController.chargeSuccess);

//rut tien

router.use('/withdraw', customerController.withdraw);

router.post('/withdraw-success', customerController.withdrawSuccess);

//mua the
router.get('/buy', customerController.buy);
router.post('/buy-success', customerController.buySuccess);

//edit
router.post('/edit-cmnd', customerController.edit);



// [link bien dong] /show || /user/:slug
router.use('/:slug',  customerController.detail)


router.use('/',isLoggined, isVerify,customerController.index)

module.exports = router;