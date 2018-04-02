var express = require('express');
var controller = require('./awsKey.controller');

var router = express.Router();

router.get('/', controller.getKey);
router.post('/', controller.addKey);
router.delete('/:keyName', controller.deleteKey);


module.exports = router;