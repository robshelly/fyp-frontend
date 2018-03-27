var jenkins = require('../../../vars').jenkins;

exports.getAll = function(req, res) {
  console.log("API::Fetching schedules restores")

    jenkins.info().then((data) => {


    // Creates list of scheduled jobs
    var schedules = data.jobs.filter(function (e){
      if (e.name.includes('schedule')) return e.name
    })

    // Get details for each job returned
    var results = [];
    var onComplete = function() {
      res.json(results)
    };

    var keys = Object.keys(schedules)
    var tasksToGo = keys.length;

    if (tasksToGo === 0) {
      onComplete();
    } else {
      keys.forEach((key) => {
    
        // Get job details, including last build number
        jenkins.job.get(schedules[key]).then((job) => {

          // Get results of last build only if job has been built
          if (job.lastBuild) {
            jenkins.build.get(job.fullName, job.lastBuild.number).then((data) => {
              results.push({
                name: job.displayName,
                lastRun: data.timestamp/1000,
                lastResult: data.result
              });
              // If all async call complete... return
              if (--tasksToGo === 0) {onComplete()}

            }).catch((err) => { console.log("Error: ", err) });
          } else {
            results.push({
              name: job.displayName,
              lastRun: null,
              lastResult: null
            });
            // If all async call complete... return
            if (--tasksToGo === 0) {onComplete()}
          }

        }).catch((err) => { console.log("Error: ", err) });
      })
    }
  }).catch((err) => { console.log("Error: ", err) });

}