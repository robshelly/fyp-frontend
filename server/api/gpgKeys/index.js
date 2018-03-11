var express = require('express');
var controller = require('./gpgKeys.controller');

var router = express.Router();

router.get('/', controller.getKeys);


module.exports = router;