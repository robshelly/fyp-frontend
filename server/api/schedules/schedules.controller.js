var jenkins = require('jenkins')({ baseUrl: 'http://admin:cloudTech2017@34.244.123.103:8080', crumbIssuer: false });

// Trigger a restore
exports.getScheduledRestores = function(req, res) {

  console.log("API::Fetching Jenkins Jobs")
  jenkins.info(function(err, data) {
    if (err) throw err;

    res.json(data)
  });

};