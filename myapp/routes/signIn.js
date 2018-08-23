var express = require('express');
var controllers = require('../controllers/controllers');

var router = express.Router();

router.use('/', controllers.signIn);
//router.post('/', controllers.signIn);
module.exports = router;