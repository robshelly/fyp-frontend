var jenkins = require('../../../vars').jenkins;

exports.get = function(req, res) {

  console.log("API::Fetching scheduled restore")
  console.log("\tName: " + req.params.scheduleName)


  jenkins.job.get('schedule-'+req.params.scheduleName, function(err, data) {
    if (err) throw err;
  
    // First get params
    var results = parseParams(data);
    // The get builds results and add to results array
  
    var buildNumbers = data.builds.map(function (e) {
      return e.number
    })
  
    var onComplete = function() {
      results.tests = results.tests.sort(function(a, b){return b.timestamp - a.timestamp})
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
            timestamp: data.timestamp/1000,
            result: data.result
          });
  
          if (--tasksToGo === 0) {
            onComplete();
          }
          
        });
      });
    }
  });

}


var parseParams = function(jobData) {

  var results = {
    name: jobData.displayName.substring(9),
    tests: []
  }

  // Getting params is more difficult as they are in nested arrays
  var params = jobData.property.find((action) => {
    if (action.hasOwnProperty('parameterDefinitions'))
      return action
  }).parameterDefinitions
  
  for (var i = 0; i < params.length; i++) {
    if (params[i].defaultParameterValue.name == 'backupIp')
      results.server = params[i].defaultParameterValue.value
    if (params[i].defaultParameterValue.name == 'pathToFile')
      results.pathToFile = params[i].defaultParameterValue.value
    if (params[i].defaultParameterValue.name == 'dataType')
      results.dataType = params[i].defaultParameterValue.value
    if (params[i].defaultParameterValue.name == 'decryptKey')
      results.decryptKey = params[i].defaultParameterValue.value
    if (params[i].defaultParameterValue.name == 'frequency')
      results.frequency = params[i].defaultParameterValue.value
  }

  return results;

}