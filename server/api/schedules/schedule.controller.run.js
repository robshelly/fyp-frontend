var jenkins = require('../../../vars').jenkins;

exports.run = function(req, res) {
  console.log("API::Running scheduled restore")
  console.log("\tName: " + req.params.scheduleName)

  // Leave parameters blank and saved default values are used
  jenkins.job.build({ name: 'schedule-'+req.params.scheduleName, parameters: {}})
    .then((data) => {
      res.json("The restoration successfully triggered!")
    })
    .catch((err) => {
      console.log(err)
    })
}