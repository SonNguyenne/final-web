const express = require('express');
const router = express.Router();



const adminController = require('../controllers/adminController');

router.use('/error', adminController.error);

router.use('/wallet-manage', adminController.walletManage);

router.use('/user-manage', adminController.userManage)

router.use('/transaction-manage', adminController.transactionManage)

router.use('/', adminController.index)

module.exports = router;