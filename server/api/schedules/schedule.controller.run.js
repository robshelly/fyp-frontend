var jenkins = require('../../../vars').jenkins;

exports.run = function(req, res) {
  console.log("API::Running scheduled restore")
  console.log("\tName: " + req.params.scheduleName)

  jenkins.job.build(
    { name: req.params.scheduleName},
    function(err) {
      if (err) throw err;
      console.log("\tSuccess")
      res.json("The restoration successfully triggered!")
    }
  );

}