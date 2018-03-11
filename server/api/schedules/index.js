var express = require('express');
var controller = require('./schedules.controller');

var router = express.Router();

router.get('/', controller.getScheduledRestores);
router.post('/', controller.createScheduledRestore);
router.get('/:scheduleName', controller.getScheduledRestore);
router.put('/:scheduleName', controller.updateScheduledRestore);
router.delete('/:scheduleName', controller.deleteScheduledRestore);


module.exports = router;