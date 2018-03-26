var jenkins = require('../../../vars').jenkins;

// Get scheduled restores
exports.getScheduledRestores = require("./schedule.controller.all.js").getAll

// Get a single scheduled restore
exports.getScheduledRestore = require("./schedule.controller.get.js").get

// Run a scheduled restore now
exports.runScheduledRestore = require("./schedule.controller.run.js").run

// Create scheduled restore
exports.createScheduledRestore = require("./schedule.controller.create.js").create

// Update scheduled restore
exports.updateScheduledRestore = require("./schedule.controller.update.js").update

// Delete a scheduled restore
exports.deleteScheduledRestore = function(req, res) {

  console.log("API::Deleting Scheduled Restores")
  console.log("\tName: + " + req.params.scheduleName)

  jenkins.job.destroy('schedule-'+req.params.scheduleName, function(err) {
    if (err){ return console.log(err); }
    console.log("\tSuccess")
    res.json("The schedule was deleted successfully!")
  });

}