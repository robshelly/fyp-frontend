var request = require('superagent');
var jenkinsUrl = require('../../../vars').jenkinsUrl;



exports.create = function(req, res) {

  console.log("API::Adding new GPG key")

  // Replace all newlines and carriage returns with \\n to post
  // Jenkins saves and uses gpg private keys as secret text
  //  so they can't have newlines
  // Replace all newlines and carriage returns with \\n 
  var privateKey = req.body.privateKey.replace(/[\n\r]/g, '\\\\n ');
  //  Also need to add quotes around it to make it a String
  privateKey = "'" + privateKey + "'"
  //  Also have to escape all plus symbols as they are special chars
  privateKey = privateKey.replace(/\+/g, '%2B');

  // Must save these as two separate credentials,
  // username/password pair and secret text for key


  var unamePwdCreatePromise = new Promise((resolve, reject) => {
    request.post(jenkinsUrl + '/credentials/store/system/domain/_/createCredentials')
    .type('application/x-www-form-urlencoded')
    .send(`json={
      "": "0",
      "credentials": {
        "scope": "GLOBAL",
        "id": "api-gpg-uname-pwd-${req.body.name}",
        "username": "${req.body.username}",
        "password": '${req.body.password}',
        "description": "CreatedByAPI:Username/Password:${req.body.name}",
        "$class": "com.cloudbees.plugins.credentials.impl.UsernamePasswordCredentialsImpl"
      }
    }`)
    .then((data) => {
      resolve("Username/Password pair created")
    })
    .catch((err) => {
      console.log("Error creating username/password pair:" + err)
      reject(err)
    });
  })

  var secretKeyCreatePromise = new Promise((resolve, reject) => {
    request.post(jenkinsUrl + '/credentials/store/system/domain/_/createCredentials')
    .type('application/x-www-form-urlencoded')
    .send(`json={
      "": "0",
      "credentials": {
        "scope": "GLOBAL",
        "id": "api-gpg-secret-key-${req.body.name}",
        "secret": "${privateKey}",
        "description": "CreatedByAPI:SecretKey:${req.body.name}",
        "$class": "org.jenkinsci.plugins.plaincredentials.impl.StringCredentialsImpl"
      }
    }`)
    .then((data) => {
      resolve("Secret key created")
    })
    .catch((err) => {
      console.log("Error creating secret key:" + err)
      reject(err)
    });
  })

  unamePwdCreatePromise
  .then(secretKeyCreatePromise)
  .then(() => {
    res.json("GPG Key successfully created")
  })
  .catch((err) => {
    console.log(err)
  })


  
}