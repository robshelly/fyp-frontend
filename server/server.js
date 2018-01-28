var express = require('express');
var jenkins = require('jenkins')({ baseUrl: 'http://admin:cloudTech2017@34.245.42.43:8080', crumbIssuer: false });

var app = express();
var router = express.Router();

require('./config/express').addMiddleware(app)

app.use('/api', router);

// Get result of basic restoration
router.get('/', function(req, res) {
  console.log("List Results Job")
  //TODO
});

// Trigger a single restoration
router.post('/', function(req, res) {

  console.log("Running Job\n"
      + "Location: " + req.body.location
      + "\nFile: "+ req.body.file
      + "\nData Type: " + req.body.dataType
      + "\nDecryption Key: " + req.body.decryptKey)

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
      console.log(err);
    }
  );

});

// All undefined asset or api routes should return a 404
app.route('/:url(api|app|assets)/*')
  .get(function(req, res) {
  res.sendStatus(404);
})

app.listen(4000, function() {
  console.log('Express server listening.');
});