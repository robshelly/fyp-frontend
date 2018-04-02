var request = require('superagent');
var jenkinsUrl = require('../../../vars').jenkinsUrl;

exports.addKey = function(req, res) {

  console.log("API::Adding new SSH key")

  request.post(jenkinsUrl + '/credentials/store/system/domain/_/createCredentials')
  .type('application/x-www-form-urlencoded')
  .send(`json={
    "": "0",
    "credentials": {
      "scope": "GLOBAL",
      "id": "api-aws-${req.body.name}",
      "accessKey": "${accessKey}",
      "secretKey": "${secretKey}",
      "description": "CreatedByAPI:AWS Credentials",
      "$class": "com.cloudbees.jenkins.plugins.awscredentials.AWSCredentialsImpl"
    }
  }`)
  .then(function(res) {
      console.log(res)
  })
  .catch(function(err) {
      console.log(err)
      console.log("Error")
  });

  
}