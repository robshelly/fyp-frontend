var jenkins = require('../../../vars').jenkins;

exports.getResults = function(req, res) {

  console.log("API::Fetching restore results")

  jenkins.job.get('auto-pipeline-backup-restoration', function(err, data) {
    if (err) throw err;

    var buildNumbers = data.builds.map(function (e) {
      return e.number
    })

    var results = [];
    var onComplete = function() {
      res.json(results.sort(function(a, b){return b.timestamp - a.timestamp}))
    };

    var keys = Object.keys(buildNumbers)
    var tasksToGo = keys.length;

    if (tasksToGo === 0) {
      onComplete();
    } else {
      // There is at least one element, so the callback will be called.
      keys.forEach(function(key) {
    
        // Do api call
        jenkins.build.get('auto-pipeline-backup-restoration', buildNumbers[key], function(err, data) {
          if (err) throw err;

          // Need to get to following details out of the response
          var id, timestamp, result, server, file
          id = data.id
          timestamp = data.timestamp/1000
          result = data.result

          // Getting params is more difficult as they are in nested arrays
          var params = data.actions.find(function(action) {
            if (action.hasOwnProperty('parameters'))
              return action
          }).parameters
          
          for (var i = 0; i < params.length; i++) {
            if (params[i].name == 'backupIp')
              server = params[i].value
            if (params[i].name == 'backupFile')
              file = params[i].value
          }

          // Push to results
          results.push({
            id: id,
            timestamp: timestamp,
            result: result,
            server: server,
            file: file
          });

          if (--tasksToGo === 0) {
            // No tasks left, good to go
            onComplete();
          }
        });
      });
    }
  });


};

// Trigger a restore
exports.runRestore = function(req, res) {

  console.log("API::Running Job")
  console.log(
      "\tServer: " + req.body.server + "\n" +
      "\tFile: "+ req.body.file + "\n" +
      "\tData Type: " + req.body.dataType + "\n" +
      "\tDecryption Key: " + req.body.decryptKey)

  jenkins.job.build(
    { name: 'auto-pipeline-backup-restoration', 
      parameters: { 
        backupIp: req.body.server,
        backupFile: req.body.file,
        dataType: req.body.dataType,
        decryptKey: req.body.decryptKey
      }
    },
    function(err) {
      if (err) throw err;
      console.log("\tSuccess")
      res.json("The restoration successfully triggered!")
    }
  );

};