const express = require('express');
const router = express.Router();



const customerController = require('../controllers/customerController');

router.use('/banking', customerController.banking);

router.use('/history', customerController.history);

router.use('/', customerController.index)

module.exports = router;