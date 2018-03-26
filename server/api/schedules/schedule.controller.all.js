var jenkins = require('../../../vars').jenkins;

exports.getAll = function(req, res) {
  console.log("API::Fetching schedules restores")

    jenkins.info(function(err, data) {


    // Creates list of scheduled jobs
    var schedules = data.jobs.filter(function (e){
      if (e.name.includes('schedule')) return e.name
    })

    // Get details for each job returned
    var results = [];
    var onComplete = function() {
      console.log("\tSuccess")
      res.json(results)
    };

    var keys = Object.keys(schedules)
    var tasksToGo = keys.length;

    if (tasksToGo === 0) {
      onComplete();
    } else {
      keys.forEach(function(key) {
    
        // Get job details, including last build number
        jenkins.job.get(schedules[key], function(err, job) {
          if (err) throw err;

          // Get results of last build
          jenkins.build.get(job.fullName, job.lastBuild.number, function(err, data) {
            if (err) throw err;
            // console.log(JSON.stringify(data));
            results.push({
              name: job.displayName,
              lastRun: data.timestamp/1000,
              lastResult: data.result
            });
            if (--tasksToGo === 0) {
              // No tasks left, good to go
              onComplete();
            }
          });
        });
      });
    }

  });
}