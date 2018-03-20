var request = require('superagent');
var ip = require('../../../vars').ip;

exports.delete = function(req, res) {

  console.log("API::Deleting SSH key")

  request.post('http://admin:cloudTech2017@' + ip + ':8080/credentials/store/system/domain/_/credential/api-ssh-' + req.params.keyName + '/doDelete')
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