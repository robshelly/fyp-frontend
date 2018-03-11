var jenkins = require('../../../vars').jenkins;

exports.get = function(req, res) {

  console.log("API::Fetching scheduled restore")
  console.log("\tName: " + req.params.scheduleName)


  jenkins.job.get('schedule-'+req.params.scheduleName, function(err, data) {
    if (err) throw err;
  
    var results = {
      name: data.displayName,
      location: 'TODO',
      file: 'TODO',
      dataType: 'TODO',
      decryptKey: 'TODO',
      frequency: 'TODO',
      tests: []
    }
  
    var buildNumbers = data.builds.map(function (e) {
      return e.number
    })
  
    var onComplete = function() {
      console.log("\tSuccess")
      res.json(results)
    };
  
    var keys = Object.keys(buildNumbers)
    var tasksToGo = keys.length;
  
    if (tasksToGo === 0) {
      onComplete();
    } else {
       keys.forEach(function(key) {
     
        jenkins.build.get('schedule-'+req.params.scheduleName, buildNumbers[key], function(err, data) {
          if (err) throw err;
          results.tests.push({
            id: data.id,
            timestamp: data.timestamp,
            results: data.result
          });
  
          if (--tasksToGo === 0) {
            onComplete();
          }
          
        });
      });
    }
  });

}