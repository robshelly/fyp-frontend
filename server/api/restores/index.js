var express = require('express');
var controller = require('./restore.controller');

var router = express.Router();

router.post('/', controller.runRestore);

module.exports = router;