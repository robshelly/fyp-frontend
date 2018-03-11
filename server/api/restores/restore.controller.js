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
      console.log("\tSuccess")
      res.json(results)
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
          results.push({
            id: data.id,
            timestamp: data.timestamp,
            result: data.result
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
      "\tLocation: " + req.body.location + "\n" +
      "\tFile: "+ req.body.file + "\n" +
      "\tData Type: " + req.body.dataType + "\n" +
      "\tDecryption Key: " + req.body.decryptKey)

  // TODO Uncomment
  // Commentes out now for testing
  jenkins.job.build(
    { name: 'backup-restoration-pipeline', 
      parameters: { 
        backupIpAddress: req.body.location,
        backup: req.body.file,
        dbIpAddress: '34.244.138.102'
      }
    },
    function(err) {
      if (err) throw err;
      console.log("\tSuccess")
      res.json("The restoration successfully triggered!")
    }
  );

};