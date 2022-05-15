const express = require('express');
const router = express.Router();

const siteController = require('../controllers/siteController');


// /product/index - product.hbs

router.use('/register',siteController.register)
router.post('/registerSuccess',siteController.registerSuccess)

router.use('/login',siteController.login)
router.post('/validation',siteController.validation)

router.use('/changePassword',siteController.changePassword)
router.post('/changePasswordSuccess',siteController.changePasswordSuccess)


router.use('/', siteController.index)

module.exports = router;