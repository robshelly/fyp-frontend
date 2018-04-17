var request = require('superagent');
var jenkinsUrl = require('../../../vars').jenkinsUrl;

exports.delete = function(req, res) {

  console.log("API::Deleting GPG key")


  var unamePwdDeletePromise = new Promise((resolve, reject) => {
    request.post(jenkinsUrl + '/credentials/store/system/domain/_/credential/api-gpg-uname-pwd-' + req.params.keyName + '/doDelete')
    .type('application/x-www-form-urlencoded')
    .send(`json={
      "Submit": "Yes"
    }`)
    .then((data) => {
      resolve("Username/Password pair deleted")
    })
    .catch((err) => {
        console.log("Error deleting Username/Password pair")
        reject(err)
    });
  });

  var secretKeyPromise = new Promise((resolve, reject) => {
    request.post(jenkinsUrl + '/credentials/store/system/domain/_/credential/api-gpg-secret-key-' + req.params.keyName + '/doDelete')
    .type('application/x-www-form-urlencoded')
    .send(`json={
      "Submit": "Yes"
    }`)
    .then((data) => {
      resolve("Secret key deleted")
    })
    .catch((err) => {
        console.log("Error deleting secret key")
        reject(err)
    });
  });

  unamePwdDeletePromise
  .then(secretKeyPromise)
  .then(() => {
    res.json("GPG Key successfully deleted")
  })
  .catch((err) => {
    console.log(err)
  })






}