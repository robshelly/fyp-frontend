var express = require('express');
var jenkins = require('jenkins')({ baseUrl: 'http://admin:cloudTech2017@34.244.123.103:8080', crumbIssuer: false });

var app = express();
// var router = express.Router();

require('./config/express').addMiddleware(app)
require('./routes')(app);


// app.use('/api', router);

// // All undefined asset or api routes should return a 404
// app.route('/:url(api|app|assets)/*')
//   .get(function(req, res) {
//   res.sendStatus(404);
// })

app.listen(4000, function() {
  console.log('Express server listening.');
});

/*
// Get all jobs from Jenkins server
router.get('/', function(req, res) {

  console.log("API::Fetching Jenkins Jobs")
  jenkins.info(function(err, data) {
    if (err) throw err;

    console.log("Jobs: " + data)
    res.json(data);
  });

});

// Trigger a single restoration
router.post('/', function(req, res) {

  console.log("API::Running Job\n"
      + "Location: " + req.body.location
      + "\nFile: "+ req.body.file
      + "\nData Type: " + req.body.dataType
      + "\nDecryption Key: " + req.body.decryptKey)

  // TODO Uncomment
  // jenkins.job.build(
  //   { name: 'backup-restoration-pipeline', 
  //     parameters: { 
  //       backupIpAddress: req.body.location,
  //       backup: req.body.file,
  //       dbIpAddress: '34.244.138.102'
  //     }
  //   },
  //   function(err) {
  //     if (err) throw err;
  //     console.log(err);
  //   }
  // );

});
*/

