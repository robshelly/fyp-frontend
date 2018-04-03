var request = require('superagent');
var jenkinsUrl = require('../../../vars').jenkinsUrl;

exports.create = function(req, res) {

  console.log("API::Adding new SSH key")

  // Replace all newlines and carriage returns with \n to post
  var privateKey = req.body.privateKey.replace(/[\n\r]/g, '\\n');

  request.post(jenkinsUrl + '/credentials/store/system/domain/_/createCredentials')
  .type('application/x-www-form-urlencoded')
  .send(`json={
    "": "0",
    "credentials": {
      "scope": "GLOBAL",
      "id": "api-ssh-${req.body.name}",
      "username": "${req.body.username}",
      "password": "",
      "privateKeySource": {
        "stapler-class": "com.cloudbees.jenkins.plugins.sshcredentials.impl.BasicSSHUserPrivateKey$DirectEntryPrivateKeySource",
        "privateKey": "${privateKey}",
      },
      "description": "CreatedByAPI::SSH ${req.body.name}",
      "stapler-class": "com.cloudbees.jenkins.plugins.sshcredentials.impl.BasicSSHUserPrivateKey"
    }
  }`)
  .then(function(data) {
    res.json("The key was successfully added!")
  })
  .catch(function(err) {
      console.log(err)
      console.log("Error")
  });

  
}