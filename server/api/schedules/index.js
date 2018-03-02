var express = require('express');
var controller = require('./schedules.controller');

var router = express.Router();

router.get('/', controller.getScheduledRestores);

module.exports = router;