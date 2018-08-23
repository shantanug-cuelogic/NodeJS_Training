var express = require('express');
var router = express.Router();
var controllers = require('../controllers/controllers');

router.use('/', controllers.signUp );

module.exports = router;