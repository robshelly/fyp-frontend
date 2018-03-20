var request = require('superagent');
var ip = require('../../../vars').ip;



exports.create = function(req, res) {

  console.log("API::Adding new GPG key")

  // Replace all newlines and carriage returns with \n to post
  var privateKey = req.body.privateKey.replace(/[\n\r]/g, '\\n');

  // Must save these as two separate credentials,
  // username/password pair and secret text for key


  var unamePwdCreatePromise = new Promise((resolve, reject) => {
    request.post('http://admin:cloudTech2017@' + ip + ':8080/credentials/store/system/domain/_/createCredentials')
    .type('application/x-www-form-urlencoded')
    .send(`json={
      "": "0",
      "credentials": {
        "scope": "GLOBAL",
        "id": "api-gpg-uname-pwd-${req.body.name}",
        "username": "${req.body.username}",
        "password": "${req.body.password}",
        "description": "CreatedByAPI:Username/Password:${req.body.description}",
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
    request.post('http://admin:cloudTech2017@' + ip + ':8080/credentials/store/system/domain/_/createCredentials')
    .type('application/x-www-form-urlencoded')
    .send(`json={
      "": "0",
      "credentials": {
        "scope": "GLOBAL",
        "id": "api-gpg-secret-key-${req.body.name}",
        "secret": "${privateKey}",
        "description": "CreatedByAPI:SecretKey:${req.body.description}",
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