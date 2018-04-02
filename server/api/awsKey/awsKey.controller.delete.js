var request = require('superagent');
var jenkinsUrl = require('../../../vars').jenkinsUrl;

exports.deleteKey = function(req, res) {
  console.log("API::Deleting AWS key")

  request.post(jenkinsUrl + '/credentials/store/system/domain/_/credential/api-aws-' + req.params.keyName + '/doDelete')
  .type('application/x-www-form-urlencoded')
  .send(`json={
    "Submit": "Yes"
  }`)
  .then((data) => {
    res.json("The key was deleted successfully")
  })
  .catch((err) => {
      console.log(err)
      console.log("Error")
  });


}