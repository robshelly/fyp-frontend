var express = require('express');
var controller = require('./sshKeys.controller');

var router = express.Router();

router.get('/', controller.getKeys);
router.post('/', controller.createKey);
router.delete('/:keyName', controller.deleteKey);


module.exports = router;