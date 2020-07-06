const express = require('express');
const controllers = require('../controller/Users')
const router = express.Router();
const auth = require('../middleware/auth')



router.post('/register', controllers.register);
router.post('/vendors/register', controllers.Shopkeeper_register);
router.post('/user/login', controllers.login);
router.post('/vendor/login', controllers.Shopkeeper_login);




module.exports = router;