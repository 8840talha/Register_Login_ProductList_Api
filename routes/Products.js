const express = require('express');
const controllers = require('../controller/Products')
const router = express.Router();
const auth = require('../middleware/auth')



router.post('/add/list', controllers.add_Product);
router.get('/vendor/list', controllers.get_Product_List)



module.exports = router;